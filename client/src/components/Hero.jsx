import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { setSearchFilter, setIsSearched } = useContext(AppContext)


    const titleRef = useRef(null)
    const locationRef = useRef(null)
    const nameRef = useRef(null)

    const onSearch = () => {

        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value,
            name: nameRef.current.value
        })
        setIsSearched(true)
        console.log({
            title: titleRef.current.value,
            location: locationRef.current.value,
            name: nameRef.current.value
        });

    }

    return (
        <div className='container 2xl:px-20 mx-auto my-10'>
            <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 1,000+ Office Smart Devices Information Repository</h2>
                <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Streamlining Office Technology devices for enhanced efficiency, accountability, and improved communication within Mutare City Council.</p>
                <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 max-4 sm:mx-auto'>
                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.search_icon} alt='search icon' />
                        <input type="text" placeholder="User Name" className='max-sm:text-xs p-2 rounded outline-none w-full '
                            ref={nameRef} />

                    </div>

                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.search_icon} alt='search icon' />
                        <input type="text" placeholder="Device" className='max-sm:text-xs p-2 rounded outline-none w-full '
                            ref={titleRef} />

                    </div>

                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.location_icon} alt='location icon' />
                        <input type="text" placeholder="Location" className='max-sm:text-xs p-2 rounded outline-none w-full '
                            ref={locationRef} />

                    </div>

                    <button onClick={onSearch} className='bg-blue-600 px-6 py-2 rounded text-white m-1'>Search</button>
                </div>
            </div>
            <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
                <div className='flex justify-center gap-8 lg:gap-10 flex-wrap'>
                    <p className='font-medium'>Trusted Companies</p>
                    <img className='h-12 w-14' src={assets.microsoft_logo} alt="" />
                    <img className='h-12 w-14' src={assets.samsung_logo} alt="" />
                    <img className='h-12 w-14' src={assets.huawei_logo} alt="" />
                    <img className='h-12 w-14' src={assets.apple_logo} alt="" />
                    <img className='h-12 w-14' src={assets.vivo_logo} alt="" />
                    <img className='h-12 w-14' src={assets.oneplus_logo} alt="" />
                    <img className='h-12 w-14' src={assets.dell_logo} alt="" />
                    <img className='h-12 w-14' src={assets.asus_logo} alt="" />
                    <img className='h-12 w-14' src={assets.lenovo_logo} alt="" />
                    <img className='h-12 w-14' src={assets.sony_logo} alt="" />
                    <img className='h-12 w-14' src={assets.lg_logo} alt="" />
                    <img className='h-12 w-14' src={assets.toshiba_logo} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Hero;
