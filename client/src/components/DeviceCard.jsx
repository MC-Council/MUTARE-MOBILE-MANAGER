import React from 'react';
import { assets } from '../assets/assets';
import {useNavigate} from 'react-router-dom'

const DeviceCard = ({ device }) => {

    const navigate = useNavigate()


    return (
        <div className='border p-6 shadow rounded'>
            <div className='flex justify-between items-center'>
                <img className='h-8' src={assets.company_icon} alt="" />
            </div>
            <h4 className='font-medium text-xl mt-2'>{device.name}</h4>
            <div className='flex gap-2.5 mt-4'>
                <span className='bg-red-50 border border-red-200 px-8 py-1.5 rounded'>{device.department}</span>
                <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{device.location}</span>
            </div>
            <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{ __html: device.description.slice(0, 150) }}></p>
            <div className='mt-8 mb-1 flex gap-4 text-sm '>
                <button onClick={() => {navigate(`/apply-device/${device._id}`); scrollTo(0,0)}} className='bg-blue-600 text-white px-4 py-2 rounded' >Return Device</button>
                <button onClick={() => {navigate(`/apply-device/${device._id}`); scrollTo(0,0)}} className='text-gray-500 border border-gray-500 rounded px-4 py-2' >More Details</button>
            </div>

        </div>
    );
}

export default DeviceCard;
