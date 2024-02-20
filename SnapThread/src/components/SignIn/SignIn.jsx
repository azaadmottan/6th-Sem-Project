import React, { useState } from 'react';
import { Logo, Processing } from "../index.js";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import authService from '../../services/authService.js';
import { login  } from "../../slicer/authSlicer.js";


function SignIn() {

    const [msg, setMsg] = useState("");
    const [processing, setProcessing] = useState(false);
    
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginForm = async (data) => {

        setProcessing(true);

        try {

            const session = await authService.login(data);

            if(session) {

                const userData = await authService.getCurrentUser();

                setProcessing(false);
                if (userData) {

                    dispatch(login(userData));
                }
                else {

                    navigate("/");
                }
            }
        } catch (error) {

            setProcessing(false);
            setMsg(error.message);

            setTimeout(() => {
                
                setMsg("");
            }, 5500);
        }
    }


    return (
    <>
        
        <div className='w-[95vw] md:w-[500px] m-auto px-2 py-4 md:p-10 rounded-2xl bg-zinc-200 bg-opacity-80'>
            <div className='flex items-center justify-center'>
                <Logo textSize={"md:text-2xl text-xl"}/>
            </div>

            <div className='text-center'>
                <h2 className='md:text-2xl text-lg mt-3'>Welcome to SnapThread</h2>
                <p className='text-zinc-600'>Find new ideas to try</p>
            </div>

            <div className='mt-2 px-2 py-4 md:px-6 md:py-4 text-gray-700 bg-white rounded-xl'>
                <div className='flex flex-wrap flex-col'>
                    <form onSubmit={handleSubmit(loginForm)}>
                        
                        <div>
                            <label htmlFor="email">Email-id</label>
                            <input type="email" {...register("email", {required: true, validate: { matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }})} id='email' placeholder='Enter your email-id' 
                            className='w-full mb-4 px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-sky-500'
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" {...register("password", {required: true,})} id='password' placeholder='Enter your password' 
                            className='w-full mb-6 px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-sky-500'
                            />
                        </div>
                        <div>
                            <p className='mb-6 font-semibold text-sm md:text-[16px] '>Don't have an account? <Link to="/signUp" className='text-blue-600 hover:text-red-600'>Sign up</Link></p>
                        </div>

                        {
                            (processing) && (

                                <Processing />
                            )
                        }

                        {
                            (msg) && (

                                <div className='bg-red-200 text-red-600 rounded-lg p-3'>
                                    {msg}
                                </div>
                            )
                        }
                        <div>
                            <button 
                                type='submit' 
                                className='w-full bg-red-600 text-white text-lg px-4 py-2 mt-6 rounded-xl hover:bg-red-700 '
                            >Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>        
    </>
    );
}

export default SignIn;