import React from 'react';
import { assets, viewReturnsData } from '../assets/assets';

const ViewApplications = () => {
  return (
    <div className="container mx-auto p-4 mb-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MM_NO
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Device Type
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Serial Number
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Department
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Location
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Return Form
              </th>
              <th className="px-3 py-6 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {viewReturnsData.map((applicant, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{index + 1}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="w-8 h-8 rounded-full mr-3" src={applicant.imgSrc} alt="" />
                    <div className="text-sm font-medium text-gray-900">
                      {applicant.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{applicant.mm_no}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{applicant.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-500">{applicant.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{applicant.SN}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-500">{applicant.jobDepartment}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-500">{applicant.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href=""
                    target="_blank"
                    className="text-blue-600 hover:text-blue-900 inline-flex gap-2 items-center"
                  >
                    Return Form 
                    <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-2 px-8 border-b mb-8 relative'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 b-8 w-24 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 '>Accept </button>
                      <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Reject</button>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm text-gray-500">{applicant.status}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewApplications;
