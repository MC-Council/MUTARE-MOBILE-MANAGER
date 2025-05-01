import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [secretKey, setSecretKey] = useState(''); // Added state for the secret key
    const { setShowAdminLogin, backendUrl, setCouncilToken, setCouncilData } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === "Login") {
                const { data } = await axios.post(`${backendUrl}/api/council/login`, { email, password });
                if (data.success) {
                    setCouncilToken(data.token);
                    setCouncilData(data.council);
                    localStorage.setItem("councilToken", data.token);
                    setShowAdminLogin(false);
                    navigate('/dashboard');
                } else {
                    toast.error(data.message);
                }
            } else if (state === "Register") {
                if (secretKey !== "MCC#25") { // Check the secret key here
                    toast.error("Invalid Secret Key.  Only administrators can register.");
                    return;
                }
                const { data } = await axios.post(`${backendUrl}/api/council/register`, { name, email, password });
                if (data.success) {
                    toast.success("Registration successful! Please login.");
                    setState("Login");
                } else {
                    toast.error(data.message);
                }
            } else { //This part seems to be a duplicate of the Register, and the register endpoint doesn't use form data.
                const formData = new FormData()
                formData.append('name', name)
                formData.append('email', email)
                formData.append('password', password)

                const { data } = await axios.post(backendUrl + '/api/council/register', formData)

                if (data.success) {
                    setCouncilToken(data.token);
                    setCouncilData(data.council);
                    localStorage.setItem("councilToken", data.token);
                    setShowAdminLogin(false);
                    navigate('/dashboard');
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>Admin {state}</h1>
                <p className='text-center text-neutral-500 text-sm'>
                    {state === 'Login' ? 'Welcome back! Please sign in to continue' : 'Create a new admin account'}
                </p>

                <>
                    {state !== 'Login' && (
                        <>
                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <img src={assets.person_icon} alt="" />
                                <input className='outline-none text-sm' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Admin Name' required />
                            </div>

                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <img src={assets.email_icon} alt="" />
                                <input className='outline-none text-sm' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email' required />
                            </div>

                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <img src={assets.lock_icon} alt="" />
                                <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
                            </div>
                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <img src={assets.key_icon} alt="" />
                                <input
                                    className='outline-none text-sm'
                                    type="text"
                                    placeholder="Enter Secret Key"
                                    value={secretKey}
                                    onChange={(e) => setSecretKey(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {state === "Login" && <p className='text-sm text-blue-600 my-4 cursor-pointer mt-4'>Forgot Password</p>}

                    <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>
                        {state === 'Login' ? 'Login' : 'Register'}
                    </button>

                    {state === 'Login' ? (
                        <p className='mt-5 text-center'>
                            Don't have an account? <span className=' text-blue-600 cursor-pointer' onClick={() => setState("Register")}>Register</span>
                        </p>
                    ) : (
                        <p className='mt-5 text-center'>
                            Already have an account? <span className=' text-blue-600 cursor-pointer' onClick={() => setState("Login")}>Login</span>
                        </p>
                    )}

                    <img onClick={() => setShowAdminLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
                </>
            </form>
        </div>
    );
};

export default AdminLogin;
