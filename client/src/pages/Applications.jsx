import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [return_form, setReturn_form] = useState(null);
  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext);

  const updateReturn_form = async () => {
    try {
      const formData = new FormData();
      formData.append('return-form', return_form);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-return-form`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsEdit(false);
      setReturn_form(null);
    }
  };

  useEffect(() => {

    if (user) {
      fetchUserApplications();
    }


  },[user])

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Return Form</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {isEdit ? (
            <>
              <label className='flex items-center' htmlFor='return_formUpload'>
                <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>Select Form</p>
                <input
                  id='return_formUpload'
                  onChange={(e) => setReturn_form(e.target.files[0])}
                  accept='application/pdf,image/*'
                  type='file'
                  hidden
                  name='return-form'
                />
                <img src={assets.profile_upload_icon} alt='' />
              </label>
              <button 
                onClick={updateReturn_form} 
                className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'
                disabled={!return_form}
              >
                Save
              </button>
              <button 
                onClick={() => {
                  setIsEdit(false);
                  setReturn_form(null);
                }} 
                className='bg-red-100 border border-red-400 rounded-lg px-4 py-2'
              >
                Cancel
              </button>
            </>
          ) : (
            <div className='flex gap-2'>
              {userData?.return_form ? (
                <a 
                  href={userData.return_form} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg'
                >
                  View Return Form
                </a>
              ) : (
                <span className='bg-gray-100 text-gray-600 px-4 py-2 rounded-lg'>
                  No Return Form
                </span>
              )}
              <button 
                onClick={() => setIsEdit(true)} 
                className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'
              >
                {userData?.return_form ? 'Update' : 'Upload'}
              </button>
            </div>
          )}
        </div>
        
        <h2 className='text-xl font-semibold mb-4'>Devices Returned</h2>
        {userApplications.length === 0 ? (
          <div className="text-center py-10">No applications found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className='min-w-full bg-white border rounded-lg'>
              <thead>
                <tr>
                  <th className='py-3 px-4 border-b text-left'>Council</th>
                  <th className='py-3 px-4 border-b text-left'>Device Name</th>
                  <th className='py-3 px-4 border-b text-left'>Device SN</th>
                  <th className='py-3 px-4 border-b text-left'>Location</th>
                  <th className='py-3 px-4 border-b text-left max-sm:hidden'>Department</th>
                  <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
                  <th className='py-3 px-4 border-b text-left'>Status</th>
                </tr>
              </thead>
              <tbody>
                {userApplications.map((application, index) => (
                  <tr key={index}>
                    <td className='py-3 px-4 flex items-center gap-2 border-b'>
                      <img 
                        className='w-8 h-8 rounded-full' 
                        src={application.councilId?.image || assets.default_profile} 
                        alt='Council' 
                      />
                      {application.councilId?.name || 'N/A'}
                    </td>
                    <td className='py-3 px-4 border-b'>{application.deviceId?.title || 'N/A'}</td>
                    <td className='py-3 px-4 border-b'>{application.deviceId?.SN || 'N/A'}</td>
                    <td className='py-3 px-4 border-b'>{application.deviceId?.location || 'N/A'}</td>
                    <td className='py-3 px-4 border-b max-sm:hidden'>{application.deviceId?.department || 'N/A'}</td>
                    <td className='py-3 px-4 border-b max-sm:hidden'>{moment(application.date).format('ll')}</td>
                    <td className='py-3 px-4 border-b'>
                      <span
                        className={`px-4 py-1.5 rounded ${
                          application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Applications;