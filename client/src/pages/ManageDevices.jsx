import React from 'react';
import { manageDevicesData } from '../assets/assets';
import moment from 'moment';
import {useNavigate} from 'react-router-dom'

const ManageDevices = () => {
  const navigate = useNavigate()
  return (
    <div className='container p-4 max-w-10xl mx-auto'>
      <div className='overflow-x-auto shadow-md rounded-lg'>
        <table className='min-w-full bg-white border-collapse'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden'>#</th>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User Name</th>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>MM_NO</th>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Device Name</th>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Device Type</th>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden'>Date</th>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Serial Number</th>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Department</th>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden'>Location</th>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center'>Return Applicants</th>
              <th className='py-3 px-6 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Visible</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {manageDevicesData.map((device, index) => (
              <tr key={index} className='hover:bg-gray-50 transition-colors'>
                <td className='py-4 px-6 border-b text-sm text-gray-900 max-sm:hidden'>{index + 1}</td>
                <td className='py-4 px-6 border-b text-sm text-gray-900'>{device.name}</td>
                <td className='py-4 px-6 border-b text-sm text-gray-900'>{device.mm_no}</td>
                <td className='py-4 px-6 border-b text-sm text-gray-900'>{device.title}</td>
                <td className='py-4 px-6 border-b text-sm text-gray-900'>{device.type}</td>
                <td className='py-4 px-6 border-b text-sm text-gray-900 max-sm:hidden'>{moment(device.date).format('ll')}</td>
                <td className='py-4 px-6 border-b text-sm text-gray-900'>{device.SN}</td>
                <td className='py-4 px-6 border-b text-sm text-gray-900'>{device.jobDepartment}</td>
                <td className='py-4 px-6 border-b text-sm text-gray-900 max-sm:hidden'>{device.location}</td>
                <td className='py-4 px-6 border-b text-sm text-gray-900 text-center'>{device.returnApplicants}</td>
                <td className='py-4 px-6 border-b text-sm text-gray-900'>
                  <input type="checkbox" className='form-checkbox ml-4 h-4 w-4 text-indigo-600 transition duration-150 ease-in-out' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <button onClick ={()=>navigate('/dashboard/add-device')}className='bg-black text-white py-2 px-4 rounded'>Add New Device</button>
      </div>
    </div>
  );
};

export default ManageDevices;