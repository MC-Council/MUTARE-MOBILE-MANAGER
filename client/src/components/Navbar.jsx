import React from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton ,useUser} from '@clerk/clerk-react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const {openSignIn}=useClerk()
    const {user}= useUser()

    const navigate = useNavigate()
    const { setShowAdminLogin} = useContext(AppContext)

    return (
        <div className='shadow py-4 h-18'>
            <div className='container px-4 mx-auto flex justify-between items-center'>
                <div className="flex items-center">
                    <img  onClick={()=> navigate('/')} className='cursor-pointer w-14 h-14 mr-4' src={assets.logo} alt="logo"/>
                    <h1 className="text-1.5xl font-bold">MUTARE SMART DEVICES MANAGER</h1>
                    {

                        user
                        ?<div className='flex items-center gap-3 max-sm:text-xs absolute top-4 right-4'>
                            <Link to ={'/applications'} className="text-1.1xl font-bold" >Returned Devices</Link>
                            <p className='max-sm:hidden text-1.1xl font-bold font-sans'>Hi, {user.firstName+" "+user.lastName}</p>
                            <UserButton />
                        </div>
                        :<div className='flex gap-4 max-sm:text-xs  absolute top-4 right-4'>
                        <button onClick ={e => setShowAdminLogin(true)}  className='text-gray-600'>Admin Login</button>
                        <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                    </div>
                    }
                </div>
                
            </div>
        </div>
    );
}

export default Navbar;