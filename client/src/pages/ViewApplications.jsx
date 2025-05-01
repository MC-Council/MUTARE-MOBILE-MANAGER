import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const ViewApplications = () => {
  const { backendUrl, councilToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(false);

  const fetchCouncilDeviceApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/council/applicants', {
        headers: { token: councilToken }
      });

      if (data.success) {
        setApplicants(data.applicants.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleStatusChange = async (applicationId, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/council/change-status',
        { id: applicationId, status },
        { headers: { token: councilToken } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCouncilDeviceApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (councilToken) {
      fetchCouncilDeviceApplications();
    }
  }, [councilToken]);

  if (!applicants) return <Loading />;
  if (applicants.length === 0) return <div className="text-center py-10">No applications found</div>;

  return (
    <div className="container mx-auto p-4 mb-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MM_NO</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Name</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Device Type</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Department</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Form</th>
              <th className="px-3 py-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicants.filter(item => item.deviceId && item.userId).map((applicant, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{index + 1}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      className="w-8 h-8 rounded-full mr-3" 
                      src={applicant.userId?.image || assets.default_profile} 
                      alt="User" 
                    />
                    <div className="text-sm font-medium text-gray-900">
                      {applicant.userId?.name || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{applicant.userId?.mm_no || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{applicant.deviceId?.title || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-500">{applicant.deviceId?.type || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{applicant.deviceId?.SN || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-500">{applicant.userId?.jobDepartment || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-500">{applicant.userId?.location || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {applicant.userId?.return_form ? (
                    <a
                      href={applicant.userId.return_form}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 inline-flex gap-2 items-center"
                    >
                      Return Form
                      <img src={assets.resume_download_icon} alt="Download" />
                    </a>
                  ) : (
                    <span className="text-gray-400">No form</span>
                  )}
                </td>
                <td className='py-2 px-8 border-b mb-8 relative'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 b-8 w-24 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button 
                        onClick={() => handleStatusChange(applicant._id, 'Approved')}
                        className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleStatusChange(applicant._id, 'Rejected')}
                        className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    applicant.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {applicant.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;