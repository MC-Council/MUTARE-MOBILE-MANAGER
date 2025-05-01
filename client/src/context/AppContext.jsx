import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
import PropTypes from 'prop-types';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const { user, isSignedIn } = useUser();
    const { getToken } = useAuth();

    // State declarations
    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: '',
        name: ''
    });
    const [isSearched, setIsSearched] = useState(false);
    const [devices, setDevices] = useState([]);
    const [showAdminLogin, setShowAdminLogin] = useState(false);
    const [councilToken, setCouncilToken] = useState(null);
    const [councilData, setCouncilData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([]);
    const [authChecked, setAuthChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch devices
    const fetchDevices = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/devices`);
            if (data.success) {
                setDevices(data.devices);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Failed to fetch devices');
        } finally {
            setLoading(false);
        }
    }, [backendUrl]);

    // Fetch council data
    const fetchCouncilData = useCallback(async () => {
        if (!councilToken) return;
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/council/council`, {
                headers: { token: councilToken },
            });
            if (data.success) {
                setCouncilData(data.council);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Failed to fetch council data');
        } finally {
            setLoading(false);
        }
    }, [backendUrl, councilToken]);

    // Fetch user data with proper auth handling
    const fetchUserData = useCallback(async () => {
        if (!isSignedIn) {
            setUserData(null);
            setAuthChecked(true);
            return;
        }

        setLoading(true);
        try {
            const token = await getToken();
            if (!token) {
                throw new Error('Authentication token not available');
            }

            const { data } = await axios.get(`${backendUrl}/api/users/user`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (data.success) {
                setUserData(data.user);
            } else {
                throw new Error(data.message || 'Failed to fetch user data');
            }
        } catch (error) {
            console.error('User data fetch error:', error);
            toast.error(error.response?.data?.message || error.message || 'Authentication failed');
            setUserData(null);
        } finally {
            setAuthChecked(true);
            setLoading(false);
        }
    }, [backendUrl, isSignedIn, getToken]);

    // Fetch user applications
    const fetchUserApplications = useCallback(async () => {
        if (!isSignedIn) {
            setUserApplications([]);
            return;
        }

        setLoading(true);
        try {
            const token = await getToken();
            if (!token) {
                throw new Error('Authentication token not available');
            }

            const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (data.success) {
                setUserApplications(data.applications);
            } else {
                throw new Error(data.message || 'Failed to fetch applications');
            }
        } catch (error) {
            console.error('Applications fetch error:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to load applications');
            setUserApplications([]);
        } finally {
            setLoading(false);
        }
    }, [backendUrl, isSignedIn, getToken]);

    // Initialize data on mount
    useEffect(() => {
        fetchDevices();
        const storedCouncilToken = localStorage.getItem('councilToken');
        if (storedCouncilToken) {
            setCouncilToken(storedCouncilToken);
        }
    }, [fetchDevices]);

    // Fetch council data when token changes
    useEffect(() => {
        if (councilToken) {
            fetchCouncilData();
        }
    }, [councilToken, fetchCouncilData]);

    // Fetch user data when auth state changes
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    // Fetch applications when user data changes
    useEffect(() => {
        if (userData?._id) {
            fetchUserApplications();
        }
    }, [userData?._id, fetchUserApplications]);

    // Context value
    const value = {
        searchFilter,
        setSearchFilter,
        isSearched,
        setIsSearched,
        devices,
        setDevices,
        showAdminLogin,
        setShowAdminLogin,
        councilToken,
        setCouncilToken,
        councilData,
        setCouncilData,
        userData,
        setUserData,
        userApplications,
        setUserApplications,
        backendUrl,
        loading,
        fetchUserData,
        fetchUserApplications,
        fetchDevices,
        getToken,
        isSignedIn,
        isLoaded: authChecked && (isSignedIn !== undefined)
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};