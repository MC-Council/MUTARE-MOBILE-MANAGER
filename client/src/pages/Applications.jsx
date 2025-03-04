import React from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { assets, devicesReturned } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';

const Applications = () => {


  const [isEdit, setIsEdit] = useState(false);


  const [form, setForm] = useState(null);




  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Return Form</h2>
        <div className=' flex gap-2 mb-6 mt-3'>
          {
            isEdit
              ? <>
                <label className='flex items-center' htmlFor='formUpload'>
                  <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Select Form</p>
                  <input id='formUpload' onChange={e => setForm(e.target.files[0])} accept='applcation/pdf' type="file" hidden />
                  <img src={assets.profile_upload_icon} alt="" />
                </label>
                <button onClick={e => setIsEdit(false)} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
              </>
              : <div className='flex gap-2'>
                <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' href="">
                  Return Form
                </a>
                <button onClick={() => setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>
                  Edit
                </button>
              </div>
          }
        </div>
        <h2 className='text-xl font-semibold mb-4'>Devices Returned</h2>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left'>User Name</th>
              <th className='py-3 px-4 border-b text-left'>Device Name</th>
              <th className='py-3 px-4 border-b text-left'>Device SN</th>
              <th className='py-3 px-4 border-b text-left'>Location</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Department</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {devicesReturned.map((device, index) => true ? (
              <tr>
                <td className='py-3 px-4 flex items-center gap-2 border-b'>
                  <img className='w-8 h-8' src={device.logo} alt="" />
                  {device.name}
                </td>
                <td className='py-3 px-4 border-b'>{device.title}</td>
                <td className='py-3 px-4 border-b'>{device.deviceId.SN}</td>
                <td className='py-3 px-4 border-b'> {device.location}</td>
                <td className='py-3 px-4 border-b max-sm:hidden'> {device.department}</td>
                <td className='py-3 px-4 border-b max-sm:hidden'>{moment(device.date).format('ll')}</td>
                <td className='py-3 px-4 border-b'>
                  <span className= {`${device.status === 'Returned' ? 'bg-green-100' : device.status ==='Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>
                    {device.status}</span>
                </td>

              </tr>
            ) : (null))}
          </tbody>
        </table>

      </div>
      <Footer/>
    </>
  );
}

export default Applications;
