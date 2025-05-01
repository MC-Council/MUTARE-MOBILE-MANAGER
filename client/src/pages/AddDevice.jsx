// AddDevice.jsx (Frontend - Corrected with email sending)
import { useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { DeviceMemorys, DeviceStorages, DeviceTypes, JobDepartments, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const AddDevice = () => {
    const [name, setName] = useState('');
    const [corporate_email, setCorporate_email] = useState('');
    const [title, setTitle] = useState('');
    const [serial_no, setSerial_no] = useState('');
    const [types, setDeviceTypes] = useState('');
    const [storage, setStorage] = useState('');
    const [memory, setMemory] = useState('');
    const [department, setDepartment] = useState('');
    const [mm_no, setMm_no] = useState('');
    const [location, setLocation] = useState('');
    const editorRef = useRef(null);
    const quillRef = useRef(null);
    const { backendUrl, councilToken } = useContext(AppContext);

    const sendConfirmationEmail = async (recipientEmail, deviceName) => {
        try {
            const response = await axios.post(`${backendUrl}/api/email/send-device-confirmation`, {
                to: recipientEmail,
                deviceName: deviceName,
            });

            if (response.data.success) {
                toast.success(`Confirmation email sent to ${recipientEmail}`);
            } else {
                toast.error(`Failed to send confirmation email to ${recipientEmail}: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Error sending confirmation email:", error);
            toast.error(`Failed to send confirmation email to ${recipientEmail}: ${error.message}`);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!types) {
            toast.error("Please select a Device Type");
            return;
        }
        if (!storage) {
            toast.error("Please select Device Storage");
            return;
        }
        if (!memory) {
            toast.error("Please select Device Memory");
            return;
        }
        if (!department) {
            toast.error("Please select a Department");
            return;
        }
        if (!location) {
            toast.error("Please select a Location");
            return;
        }
        try {
            const description = quillRef.current.root.innerHTML;
            const dataToSend = { name, corporate_email, mm_no, title, SN: serial_no, type: types, storage, memory, department, location, description };
            console.log("Data to send:", dataToSend);
            const { data } = await axios.post(`${backendUrl}/api/council/post-device`,
                dataToSend,
                { headers: { token: councilToken } }
            );

            if (data.success) {
                toast.success(data.message);
                // Send confirmation email after successful device capture
                sendConfirmationEmail(corporate_email, title);
                setName('');
                setMm_no('');
                setCorporate_email('');
                setTitle('');
                setSerial_no('');
                setDeviceTypes('');
                setStorage('');
                setMemory('');
                setDepartment('');
                setLocation('');
                if (quillRef.current) {
                    quillRef.current.root.innerHTML = "";
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Frontend error:", error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Type here...'
            });
        }
    }, []);

    return (
        <form className='container p-4 flex flex-col w-full items-start gap-3' onSubmit={onSubmitHandler}>
            <div className='w-full'>
                <p className='mb-2'>Full Name</p>
                <input type="text" placeholder='Type here' onChange={e => setName(e.target.value)} value={name} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' />
            </div>
            <div className='w-full'>
                <p className='mb-2'>MM_NO</p>
                <input type="text" placeholder='Type here' onChange={e => setMm_no(e.target.value)} value={mm_no} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Corporate Email</p>
                <input type="text" placeholder='Type here' onChange={e => setCorporate_email(e.target.value)} value={corporate_email} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Device Name</p>
                <input type="text" placeholder='Type here' onChange={e => setTitle(e.target.value)} value={title} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Serial Number</p>
                <input type="text" placeholder='Type here' onChange={e => setSerial_no(e.target.value)} value={serial_no} required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <div>
                        <p className='mb-2'>Device Type</p>
                        <select
                            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
                            onChange={e => setDeviceTypes(e.target.value)}
                            value={types}
                            required
                        >
                            <option value="" disabled defaultValue>Select Device Type</option>
                            {DeviceTypes.map((deviceType, index) => (
                                <option key={index} value={deviceType}>{deviceType}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <div>
                        <p className='mb-2'>Device Storage</p>
                        <select
                            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
                            onChange={e => setStorage(e.target.value)}
                            value={storage}
                            required
                        >
                            <option value="" disabled defaultValue>Select Storage</option>
                            {DeviceStorages.map((storages, index) => (
                                <option key={index} value={storages}>{storages}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <div>
                        <p className='mb-2'>Device Memory</p>
                        <select
                            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
                            onChange={e => setMemory(e.target.value)}
                            value={memory}
                            required
                        >
                            <option value="" disabled defaultValue>Select Memory</option>
                            {DeviceMemorys.map((memorys, index) => (
                                <option key={index} value={memorys}>{memorys}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className='w-full max-w-lg'>
                <p className='my-2'>Package Description</p>
                <div ref={editorRef}></div>
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <div>
                        <p className='mb-2'>Department</p>
                        <select
                            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
                            onChange={e => setDepartment(e.target.value)}
                            value={department}
                            required
                        >
                            <option value="" disabled defaultValue>Select Department</option>
                            {JobDepartments.map((dept, index) => (
                                <option key={index} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <p className='mb-2'>Location</p>
                        <select
                            className='w-full px-3 py-2 border-2 border-gray-300 rounded'
                            onChange={e => setLocation(e.target.value)}
                            value={location}
                            required
                        >
                            <option value="" disabled defaultValue>Select Location</option>
                            {JobLocations.map((loc, index) => (
                                <option key={index} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <button type="submit" className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>
        </form>
    );
};

export default AddDevice;