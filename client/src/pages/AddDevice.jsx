import React, { useEffect, useRef, useState } from 'react';

import Quill from 'quill';
import { DeviceMemorys, DeviceStorages, DeviceTypes, JobDepartments, JobLocations } from '../assets/assets';

const AddDevice = () => {


  const [name, setName] = useState('');

  const [title, setTitle] = useState('');

  const [serial_no, setSerial_no] = useState('');

  const [types, setDeviceTypes] = useState('');

  const [storage, setStorage] = useState('');

  const [memory, setMemory] = useState('');

  const [department, setDepartment] = useState('Office of the Town Clerk');

  const [mm_no, setMm_no] = useState('');

  const [location, setLocation] = useState('Sakubva');

  const editorRef = useRef(null);

  const quillRef = useRef(null);


  useEffect(() => {
    // Initiate Quill only once

    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Type here...'
      })

    }

  }, [])


  return (
    <form className='container p-4 flex flex-col w-full items-start gap-3'>
      <div className='w-full'>
        <p className = 'mb-2'>
          User Name
        </p>
        <input type="text" placeholder='Type here'
          onChange={e => setName(e.target.value)} value={name}
          required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' />
      </div>
      <div className='w-full'>
        <p className = 'mb-2'>
          MM_NO
        </p>
        <input type="text" placeholder='Type here'
          onChange={e => setMm_no(e.target.value)} value={mm_no}
          required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded' />
      </div>
      <div className='w-full'>
        <p className = 'mb-2'>
          Device Name
        </p>
        <input type="text" placeholder='Type here'
          onChange={e => setTitle(e.target.value)} value={title}
          required className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'/>
      </div>
      <div className='w-full'>
        <p className = 'mb-2'>
          Serial Number
        </p>
        <input type="text" placeholder='Type here'
          onChange={e => setSerial_no(e.target.value)} value={serial_no}
          required  className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
      <div>
        <div>
          <p className = 'mb-2'>Device Type</p>
          <select  className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setDeviceTypes(e.target.value)}>
            {DeviceTypes.map((types, index) => (
              <option key={index} value={types}>{types}</option>
            ))}
          </select>
        </div>

      </div>

      <div>
        <div>
          <p className = 'mb-2'>Device Storage</p>
          <select  className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setStorage(e.target.value)}>
            {DeviceStorages.map((storages, index) => (
              <option key={index} value={storages}>{storages}</option>
            ))}
          </select>
        </div>

      </div>

      <div>
        <div>
          <p className = 'mb-2'>Device Memory</p>
          <select  className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setMemory(e.target.value)}>
            {DeviceMemorys.map((memorys, index) => (
              <option key={index} value={memorys}>{memorys}</option>
            ))}
          </select>
        </div>

      </div>

      </div>

      
      
      <div className='w-full max-w-lg'>
        <p className='my-2'>
          Package Description
        </p>
        <div ref={editorRef}>

        </div>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
      <div >
        <div>
          <p className = 'mb-2'>Department</p>
          <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setDepartment(e.target.value)}>
            {JobDepartments.map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
          </select>
        </div>

      </div>
      <div>
        <div>
          <p className = 'mb-2'>Location</p>
          <select  className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLocation(e.target.value)}>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

      </div>

      </div>
      

      <button className='w-28 py-3 mt-4 bg-black text-white rounded'>ADD</button>

    </form>
  );
}

export default AddDevice;
