import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import moment from 'moment';
import DeviceCard from '../components/DeviceCard';
import Footer from '../components/Footer';

const ApplyDevice = () => {

  const { id } = useParams();

  const [DeviceData, setDeviceData] = useState(null)

  const { devices } = useContext(AppContext)

  const fetchDevice = async () => {
    const data = devices.filter(device => device._id === id)

    if (data.length !== 0) {
      setDeviceData(data[0])
      console.log(data[0])
    }
  }

  useEffect(() => {
    if (devices.length > 0) {
      fetchDevice()
    }
  }, [id, devices])

  return DeviceData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg p-6 shadow-md">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 mb-6 ">
            <div className="flex flex-col md:flex-row items-center">
              <img src={DeviceData.deviceId.image} alt="" className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
            </div>
            <h1 className="text-2xl font-bold mb-4">{DeviceData.name}</h1>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <span className="flex items-center gap-2">
                <img src={assets.suitcase_icon} alt="" className="w-5 h-5 mr-2" />
                {DeviceData.title}
              </span>
              <span className="flex items-center gap-2">
                <img src={assets.location_icon} alt="" className="w-5 h-5 mr-2" />
                {DeviceData.location}
              </span>
              <span className="flex items-center gap-2">
                <img src={assets.person_icon} alt="" className="w-5 h-5 mr-2" />
                {DeviceData.department}
              </span>
              <span className="flex items-center-gap-2">
                <img src={assets.money_icon} alt="" className="w-5 h-5 mr-2" />
                MM_NO : {DeviceData.mm_no}
              </span>
            </div>
          </div>
          <div className="flex justify-center mt-6"> {/* Added div for button */}
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Return Device</button>
          </div>
          <p className="mt-4 text-center">Recorded {moment(DeviceData.date, 'DD/MM/YY').fromNow()}</p>
        </div>

        <div className='flex flex-col lg:flex-row justify-between items-start'>
          <div className='w-full lg:w-2/3'>
            <h2 className='font-bold text-2xl mb-4'>Package Description</h2>
            <div className='rich-text' dangerouslySetInnerHTML={{ __html: DeviceData.description }}>

            </div>
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mt-10">Return Device Now</button>
          </div>
          {/* Right Section for More devices of the user */}
          <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
            <h2 className='font-bold text-2xl mt-10 mb-10'> More Devices of {DeviceData.name}</h2>
            {devices.filter(device =>
              device._id !== DeviceData._id &&
              device.name === DeviceData.name &&
              device.mm_no === DeviceData.mm_no &&
              device.deviceId.SN !== DeviceData.deviceId.SN
            )
              .slice(0, 4)
              .map((device, index) => <DeviceCard key={index} device={device} />)}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  ) : (
    <Loading />
  )
}

export default ApplyDevice;