import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { MdCloudUpload } from "react-icons/md";
import { AiFillDelete, AiFillFileImage } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Processing } from "../components/index.js";
import confService from "../services/confService.js";
import authService from "../services/authService.js";
import { logout } from "../slicer/authSlicer.js";


function EditProfile() {

    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No File Selected.");

    const navigate = useNavigate();

    const [processing, setProcessing] = useState(false);
    const [msg, setMsg] = useState(false);

    const userId = useSelector((state) => (state.auth.userData?.$id));

    const { register, handleSubmit, setValue } = useForm();

    
    const submitProfile = async (data) => {


        setProcessing(true);

        if (data) {

            const file = await confService.uploadProfilePicture(data.image[0]);

            if (file) {
                
                const fileId = file.$id;
                
                const dbPost = await confService.createProfile({ userId: userId, avatarId: fileId, aboutUser: data.aboutUser });
            }

            const resp = await authService.updateUserProfile({ userId, name: data.userName });

            setProcessing(false);

            setMsg(true);
            // useDispatch(logout());

            // navigate("/signIn");
        }
    }


    return (

    <>
    <div className='lg:w-8/12 md:w-11/12 w-[95%] m-auto md:px-6 md:py-8 px-2 py-4 bg-zinc-200 bg-opacity-70 rounded-lg  dark:bg-[#15016e]'>

        <div className='text-center text-black font-medium lg:text-3xl md:text-2xl text-xl dark:text-white'>
            <h2>Edit Your Personal Information</h2>
        </div>


        <form onSubmit={handleSubmit(submitProfile)}>
        <div className='bg-white flex flex-col md:flex md:flex-row max-w-[100%] items-center justify-between px-2 py-4 md:px-12 md:py-8 lg:px-12 lg:py-8 mt-8 rounded-xl border-2 border-red-600 dark:bg-[#030131]'>


            <div className='md:w-[48%] w-full'>
                <div 
                    className='w-[100%] h-[38vh] flex flex-col items-center justify-center border-blue-600 border-2 border-dashed active:border-red-800 rounded-lg cursor-pointer'
                    title="Select Image File"
                    
                    onClick={() => document.querySelector(".input-file").click()}
                    onChange={({ target: {files} }) => {
                        files[0] && setFileName(files[0].name)

                        if(files) {

                            setImage(URL.createObjectURL(files[0]));
                        }
                        
                    }}
                >
                    <input 
                        type="file" 
                        className='input-file' 
                        hidden
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: true })}
                        />

                    {
                        image ? (

                            <img 
                            src={image} 
                                className='w-[100%] h-[100%] p-2 object-contain rounded-lg' 
                                alt={image.title} 
                                />
                        ) : (

                            <>
                            <MdCloudUpload color={"#E60023"} size={"70px"}/>

                            <h3 className='text-red-600 font-medium'>Browse File to Upload.</h3>
                        </>
                        )
                    }
                </div>

                <div className='w-full flex items-center justify-between mt-4 bg-zinc-100 rounded-lg md:p-3 p-1'>

                    <div className='flex items-center gap-2 md:text-lg text-sm'>
                        <AiFillFileImage color={"#E60023"} size={"22px"} />
                        <span className='font-medium lg:w-44 md:w-44 text-ellipsis overflow-hidden'>
                        {
                            fileName
                        }
                        </span>
                    </div>

                    <span className='hover:bg-zinc-300 p-2 rounded-lg cursor-pointer'
                        onClick={() => {
                            
                            setImage(null)
                            setFileName("No File Selected.")
                        }}
                        >

                        <AiFillDelete color={"#E60023"} size={"22px"} title='Delete File' />
                    </span>
                </div>

            </div>

            <div className="md:w-[48%] mt-6 md:mt-0 w-full font-medium">
                <div>
                    <label htmlFor="username" className="dark:text-white">Username</label>
                    <input type="text" {...register("userName", {required: true,})} id='username' placeholder='Enter username' 
                    className='w-full mb-4 px-3 py-2 border-2 rounded-lg focus:outline-none tracking-wider focus:border-sky-500 dark:focus:border-red-500 dark:bg-[#030131] dark:text-white'
                    autoComplete="off"
                    />
                </div>
                
                {/* <div>
                    <label htmlFor="email"  className="dark:text-white">Email-id</label>
                    <input type="email" {...register("email", {required: true, validate: { matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }})} id='email' placeholder='Enter email-id' 
                    className='w-full mb-4 px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-sky-500 dark:focus:border-red-500'
                    autoComplete="off"
                    />
                </div> */}

                <div>
                    <label htmlFor="aboutUser"  className="dark:text-white">About User</label>
                    <input type="text" {...register("aboutUser", {required: false,})} id='aboutUser' placeholder='About your self...' 
                    className='w-full mb-4 px-3 py-2 border-2 rounded-lg focus:outline-none tracking-wider focus:border-sky-500 dark:focus:border-red-500 dark:bg-[#030131] dark:text-white'
                    autoComplete="off"
                    />
                </div>

                {
                    (processing) && (

                        <Processing />
                    )
                }

                {
                    (msg) && (

                        <div className="dark:bg-[#3029c0] dark:text-white mt-2 bg-blue-700 text-white rounded-lg flex items-center justify-center p-2 select-none" title="Update can be reflected after login again.">
                            You have to login again !
                        </div>
                    )
                }
                <div>
                    <button 
                        type='submit' 
                        className='w-full bg-red-600 text-white text-lg px-4 py-2 mt-6 rounded-xl hover:bg-red-700 '
                    >Save & Update</button>
                </div>
            </div>


        </div>
        </form>
    </div>
    </>
    )
}

export default EditProfile;