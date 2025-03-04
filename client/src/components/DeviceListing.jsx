import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobDepartments, JobLocations } from '../assets/assets';
import DeviceCard from './DeviceCard';

const DeviceListing = () => {

  const { isSearched, searchFilter, setSearchFilter, devices } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [selectedLocations, setSelectedLocations] = useState([])
  const [selectedDepartments, setSelectedDepartments] = useState([])

  const [filteredDevices, setFilteredDevices] = useState(devices)

  const handleDepartmentChange = (department) => {
    return (event) => { 
      const isSelected = selectedDepartments.includes(department);
      setSelectedDepartments(
        isSelected ? 
          prev => prev.filter(d => d !== department) : 
          prev => [...prev, department]
      );
    };
  };

  const handleLocactionChange = (location) => {
    return (event) => {
      const isSelected = selectedLocations.includes(location);
      setSelectedLocations(
        isSelected ? 
          prev => prev.filter(l => l !== location) : 
          prev => [...prev, location]
      );
    };
  };

  useEffect(() => {
    const matchesDepartment = device => selectedDepartments.length === 0 || selectedDepartments.includes(device.department)

    const matchesLocation = device => selectedLocations.length === 0 || selectedLocations.includes(device.location)

    const matchesTitle = device => searchFilter.title === "" || device.title.toLowerCase().includes(searchFilter.title.toLowerCase()) 

    const matchesName = device => searchFilter.name === "" || device.name.toLowerCase().includes(searchFilter.name.toLowerCase())

    const matchesSearchLocation = device => searchFilter.location === "" || device.location.toLowerCase().includes(searchFilter.location.toLowerCase())

    const newFilteredDevices = devices.slice().reverse().filter(

      device => matchesDepartment(device) && matchesLocation(device) && matchesTitle(device) && matchesName(device) && matchesSearchLocation(device)
    )
    setFilteredDevices(newFilteredDevices)
    setCurrentPage(1)


  }, [selectedDepartments, selectedLocations, searchFilter])

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8'>
      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>
        {/* Search Filter from Hero Component */}
        {isSearched && (searchFilter.title !== "" || searchFilter.location !== "" || searchFilter.name !== "") && (
          <>
            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
            <div className='mb-6 text-gray-600'>
              {searchFilter.name && (
                <span className='mb-4 inline-flex items-center gap-2.5 bg-green-50 border border-green-200 px-4 py-1.5 rounded'>
                  {searchFilter.name}
                  <img
                    onClick={e => setSearchFilter(prev => ({ ...prev, name: "" }))}
                    className='cursor-pointer'
                    src={assets.cross_icon}
                    alt=""
                  />
                </span>
              )}
              {searchFilter.title && (
                <span className='mb-4 ml-2 inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                  {searchFilter.title}
                  <img
                    onClick={e => setSearchFilter(prev => ({ ...prev, title: "" }))}
                    className='cursor-pointer'
                    src={assets.cross_icon}
                    alt=""
                  />
                </span>
              )}
              {searchFilter.location && (
                <span className='mb-4 ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                  {searchFilter.location}
                  <img
                    onClick={e => setSearchFilter(prev => ({ ...prev, location: "" }))}
                    className='cursor-pointer'
                    src={assets.cross_icon}
                    alt=""
                  />
                </span>
              )}
            </div>
            <button onClick={e => setShowFilter(prev => !prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
              {showFilter ? "Close" : "Filters"}
            </button>

            {/*Filter by Department */}
            <div className={showFilter ? "" : "max-lg:hidden"}>

              <h4 className='font-medium text-lg py-4'>Filter by Department</h4>

              <ul className='space-y-4 text-gray-600'>
                {JobDepartments.map((department, index) => (
                  <li className='flex gap-3 items-center' key={index}>
                    <input className='scale-125'
                      type="checkbox"
                      onChange={handleDepartmentChange(department)}
                      checked={selectedDepartments.includes(department)} />
                    {department}
                  </li>
                ))}
              </ul>
            </div>

            {/*Filter by Location */}
            <div className={showFilter ? "" : "max-lg:hidden"}>
              <h4 className='font-medium text-lg py-4 pt-14'>Filter by Location</h4>

              <ul className='space-y-4 text-gray-600'>
                {JobLocations.map((location, index) => (
                  <li className='flex gap-3 items-center' key={index}>
                    <input className='scale-125'
                      type="checkbox"
                      onChange={handleLocactionChange(location)}
                      checked={selectedLocations.includes(location)} />
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/*Collected Devices List*/}
      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2' id='device-list'>
          Recent Allocated Devices
        </h3>
        <p className='mb-8'>
          The successful implementation of this initiative involved the allocation
          of a diverse range of devices, including laptops and mobile phones, to
          employees across various departments within the council.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {filteredDevices.slice((currentPage - 1) * 6, currentPage * 6).map((device, index) => (
            <DeviceCard key={device.id} device={device} /> 
          ))}
        </div>
        {/*Pagination */}
        {filteredDevices.length > 0 && (
          <div className='flex items-center justify-center space-x-2 mt-10'>
            <a href="#device-list">
              <img onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)} src={assets.left_arrow_icon} alt="" />
            </a>
            {Array.from({ length: Math.ceil(filteredDevices.length / 6) }).map((_, index) => (
              <a key={index} href="#device-list">
                <button onClick={() => setCurrentPage(index + 1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
              </a>
            ))}
            <a href="#device-list">
              <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredDevices.length / 6)))} src={assets.right_arrow_icon} alt="" />
            </a>
          </div>
        )}

      </section>
    </div>
  );
};

export default DeviceListing;