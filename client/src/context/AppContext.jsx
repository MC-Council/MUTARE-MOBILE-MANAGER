import { createContext, useEffect, useState } from "react";
import { devicesData } from "../assets/assets"; 

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const [searchFilter,setSearchFilter] = useState({
        title:'',
        location:'',
        name:''
    })

    const [isSearched, setIsSearched] = useState(false)
    const [devices, setDevices] = useState([]); 

    const [showAdminLogin, setShowAdminLogin] = useState(false);

    useEffect(() => {
        // Fetch devices data from assets.js
        setDevices(devicesData); 
    }, []);

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        devices, setDevices, 
        showAdminLogin, setShowAdminLogin
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}