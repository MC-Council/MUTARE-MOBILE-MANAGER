
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";

const Dashboard = () => {
    const navigate = useNavigate();
    const { councilData, setCouncilToken, setCouncilData } = useContext(AppContext); // Added context setters

    const handleLogout = () => {
        setCouncilToken(null);
        setCouncilData(null);
        localStorage.removeItem("councilToken"); // Clear from local storage if used
        navigate("/"); // Navigate to login or home page
    };

    useEffect(()=> {

        if (councilData) {
            navigate('/dashboard/manage-devices')
        }

    },[councilData])

    return (
        <div className="min-h-screen">
            <div className="shadow py-4">
                <div className="px-5 flex justify-between items-center">
                    <img
                        onClick={(e) => navigate("/")}
                        className="max-sm:w-16 cursor-pointer w-14 h-14 mr-4"
                        src={assets.logo}
                        alt=""
                    />
                    {councilData && (
                        <div className="flex items-center gap-3">
                            <p className="max-sm:hidden">Welcome, {councilData.name} </p>
                            <div className="relative group">
                                <img className="w-20 h-20 border rounded-full" src={assets.administrator_logo} alt="" />
                                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                                    <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                                        <li className="py-1 px-2 cursor-pointer pr-10" onClick={handleLogout}>
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-start">
                <div className="inline-block min-h-screen border-r-2">
                    <ul className="flex flex-col items-start pt-5 text-gray-800">
                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && "bg-blue-100 border-r-4 border-blue-500"}`
                            }
                            to={"/dashboard/add-device"}
                        >
                            <img className="min-w-4" src={assets.add_icon} alt="" />
                            <p className="max-sm:hidden">Add Device</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && "bg-blue-100 border-r-4 border-blue-500"}`
                            }
                            to={"/dashboard/manage-devices"}
                        >
                            <img className="min-w-4" src={assets.home_icon} alt="" />
                            <p className="max-sm:hidden">Manage Devices</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) =>
                                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && "bg-blue-100 border-r-4 border-blue-500"}`
                            }
                            to={"/dashboard/view-applications"}
                        >
                            <img className="min-w-4" src={assets.person_tick_icon} alt="" />
                            <p className="max-sm:hidden">View Returned Devices</p>
                        </NavLink>
                    </ul>
                </div>
                <div className = 'flex-1 h-full p-2 sm:p-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;