import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import moment from 'moment';
import DeviceCard from '../components/DeviceCard';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { useAuth, useClerk } from '@clerk/clerk-react';

const ApplyDevice = () => {
    const { id } = useParams();
    const [deviceData, setDeviceData] = useState(null);
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
    const { getToken, isSignedIn } = useAuth();
    const { openSignIn } = useClerk();
    const {
        devices,
        userData,
        userApplications,
        fetchUserApplications,
        backendUrl,
        loading: contextLoading
    } = useContext(AppContext);
    const navigate = useNavigate();

    const fetchDevice = () => {
        const foundDevice = devices.find(device => device._id === id);
        if (foundDevice) {
            setDeviceData(foundDevice);
        } else {
            toast.error("Device not found");
            navigate('/');
        }
    };

    const applyHandler = async () => {
        try {
            // First check authentication state
            if (!isSignedIn) {
                openSignIn();
                return toast.error('Please login to apply');
            }

            // Then verify token and user data
            const token = await getToken();
            if (!token) {
                return toast.error('Authentication error - please refresh');
            }

            if (!userData) {
                return toast.error('User data not loaded - please wait');
            }

            if (!userData.return_form?.data) {
                navigate('/applications');
                return toast.error('Please upload return form first');
            }

            // Proceed with application
            const response = await fetch(`${backendUrl}/api/users/apply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ deviceId: id })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'Application failed');
            }

            const data = await response.json();
            toast.success(data.message || 'Application submitted');
            await fetchUserApplications();
        } catch (error) {
            toast.error(error.message || 'Application error');
            console.error("Application error:", error);
        }
    };

    useEffect(() => {
        if (devices.length) fetchDevice();
    }, [id, devices]);

    useEffect(() => {
        if (deviceData && userApplications) {
            setIsAlreadyApplied(userApplications.some(app => app.deviceId?._id === id));
        }
    }, [deviceData, userApplications, id]);

    if (contextLoading || !deviceData) return <Loading />;

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
                <div className="bg-white text-black rounded-lg p-6 shadow-md">
                    <div className="flex justify-center md:justify-between flex-wrap gap-8 mb-6">
                        <div className="flex flex-col md:flex-row items-center">
                            {assets?.company_icon && (
                                <img src={assets.company_icon} alt="Company" className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
                            )}
                        </div>
                        <h1 className="text-4xl font-semibold mb-4">{deviceData.name}</h1>
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-15px font-semibold text-gray-700">
                            <span className="flex items-center gap-2">
                                <img src={assets?.suitcase_icon} alt="" className="w-5 h-5 mr-2" />
                                {deviceData.title}
                            </span>
                            <span className="flex items-center gap-2">
                                <img src={assets?.location_icon} alt="" className="w-5 h-5 mr-2" />
                                {deviceData.location}
                            </span>
                            <span className="flex items-center gap-2">
                                <img src={assets?.person_icon} alt="" className="w-5 h-5 mr-2" />
                                {deviceData.department}
                            </span>
                            <span className="flex items-center gap-2">
                                <img src={assets?.money_icon} alt="" className="w-5 h-5 mr-2" />
                                MM_NO: {deviceData.mm_no}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={applyHandler}
                            disabled={isAlreadyApplied}
                            className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded
                                ${isAlreadyApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAlreadyApplied ? 'Application Submitted' : 'Apply Now'}
                        </button>
                    </div>
                    <p className="mt-4 text-center">
                        Recorded {moment(deviceData.date).fromNow()}
                    </p>
                </div>

                <div className='flex flex-col lg:flex-row justify-between items-start mt-10'>
                    <div className='w-full lg:w-2/3'>
                        <h2 className='font-bold text-2xl mb-4'>Device Description</h2>
                        <div className='rich-text' dangerouslySetInnerHTML={{ __html: deviceData.description }} />

                        <button
                            onClick={applyHandler}
                            disabled={isAlreadyApplied}
                            className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-10
                                ${isAlreadyApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isAlreadyApplied ? 'Already Applied' : 'Apply For Return'}
                        </button>
                    </div>

                    <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
                        <h2 className='font-bold text-2xl mt-10 mb-10'> More Devices Of {deviceData.name} </h2>
                        {devices
                            .filter(device =>
                                device._id !== deviceData._id &&
                                device.name === deviceData.name &&
                                device.mm_no === deviceData.mm_no
                            )
                            .slice(0, 4)
                            .map(device => (
                                <DeviceCard key={device._id} device={device} />
                            ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ApplyDevice;