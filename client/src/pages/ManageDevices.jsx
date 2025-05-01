import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { JobDepartments, JobLocations, DeviceTypes } from "../assets/assets";
import Loading from "../components/Loading";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';


const ManageDevices = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const { backendUrl, councilToken } = useContext(AppContext);
    const [filterType, setFilterType] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("");
    const [filterLocation, setFilterLocation] = useState("");
    const [loading, setLoading] = useState(true);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deviceToDeleteId, setDeviceToDeleteId] = useState(null);

    const fetchCompanyDevices = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/council/device`, {
                headers: { token: councilToken },
            });
            if (data.success) {
                setDevices(data.devicesData);
            } else {
                toast.error(data.message);
                setDevices([]);
            }
        } catch (error) {
            toast.error(error.message);
            setDevices([]);
        } finally {
            setLoading(false);
        }
    };

    const changeDeviceVisibility = async (id) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/council/change-visibility`,
                { id },
                {
                    headers: { token: councilToken },
                }
            );

            if (data.success) {
                toast.success("Device visibility changed successfully");
                fetchCompanyDevices();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const openDeleteConfirmation = (deviceId) => {
        setDeviceToDeleteId(deviceId);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteConfirmation = () => {
        setIsDeleteDialogOpen(false);
        setDeviceToDeleteId(null);
    };

    const confirmDeleteDevice = async () => {
        if (deviceToDeleteId) {
            try {
                const { data } = await axios.delete(
                    `${backendUrl}/api/council/device/${deviceToDeleteId}`,
                    {
                        headers: { token: councilToken }
                    }
                );

                if (data.success) {
                    toast.success(data.message);
                    fetchCompanyDevices();
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Delete failed');
            } finally {
                closeDeleteConfirmation();
            }
        }
    };

    useEffect(() => {
        if (councilToken) {
            fetchCompanyDevices();
        }
    }, [councilToken]);

    // Filter devices based on selected type and department
    const filteredDevices = Array.isArray(devices) ? devices.filter((device) => {
        const typeMatch = !filterType || device.type === filterType;
        const departmentMatch =
            !filterDepartment || device.department === filterDepartment;
        const locationMatch = !filterLocation || device.location === filterLocation;
        return typeMatch && departmentMatch && locationMatch;
    }) : [];

    return (
        <div className="container p-4 max-w-10xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Devices</h1>
                <button
                    onClick={() => navigate("/dashboard/add-device")}
                    className="bg-black text-white py-2 px-4 rounded"
                >
                    Add New Device
                </button>
            </div>

            {/* Filter Dropdowns using standard HTML select */}
            <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <label htmlFor="type-filter" className="text-sm font-medium">
                        Filter by Device Type
                    </label>
                    <select
                        id="type-filter"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">All Types</option>
                        {DeviceTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2 min-w-[200px]">
                    <label htmlFor="department-filter" className="text-sm font-medium">
                        Filter by Department
                    </label>
                    <select
                        id="department-filter"
                        value={filterDepartment}
                        onChange={(e) => setFilterDepartment(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">All Departments</option>
                        {JobDepartments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <label htmlFor="location-filter" className="text-sm font-medium">
                        Filter by Location
                    </label>
                    <select
                        id="location-filter"
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">All Locations</option>
                        {JobLocations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading devices...</p>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden">
                                    #
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Full Name
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    MM_NO
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Corporate Email
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Device Name
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Device Type
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden">
                                    Date
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Serial Number
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Department
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden">
                                    Location
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                    Return Applicants
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Visible
                                </th>
                                <th className="py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredDevices.map((device, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4 px-6 border-b text-sm text-gray-900 max-sm:hidden">
                                        {index + 1}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900">
                                        {device.name}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900">
                                        {device.mm_no}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900">
                                        {device.corporate_email}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900">
                                        {device.title}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900">
                                        {device.type}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900 max-sm:hidden">
                                        {moment(device.date).format("ll")}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900">
                                        {device.SN}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900">
                                        {device.department}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900 max-sm:hidden">
                                        {device.location}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900 text-center">
                                        {device.returnApplicants?.length || 0}
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900">
                                        <input
                                            onChange={() => changeDeviceVisibility(device._id)}
                                            type="checkbox"
                                            checked={device.visible}
                                            className="form-checkbox ml-4 h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                        />
                                    </td>
                                    <td className="py-4 px-6 border-b text-sm text-gray-900">
                                        <button
                                            onClick={() => openDeleteConfirmation(device._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-4 flex justify-end">
                <button
                    onClick={() => navigate("/dashboard/add-device")}
                    className="bg-black text-white py-2 px-4 rounded"
                >
                    Add New Device
                </button>
            </div>

            {/* Custom Delete Confirmation Modal */}
            {isDeleteDialogOpen && (
                <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Modal backdrop */}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        {/* This element is to trick the browser into centering the modal content. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>

                        {/* Modal panel */}
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left sm:flex-grow">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Delete Device
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this device? This action cannot be
                                                undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={confirmDeleteDevice}
                                >
                                    Confirm Delete
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={closeDeleteConfirmation}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageDevices;
