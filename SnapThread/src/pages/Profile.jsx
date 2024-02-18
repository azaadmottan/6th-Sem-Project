import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import flag from "../assets/flag.png"
import { FaUserEdit } from "react-icons/fa";
import { ToolTip } from "../components";
import confService from "../services/confService";
import { Logo, PostCard } from "../components/index.js";
import { Link } from "react-router-dom";



function Profile() {

    const userId = useSelector((state) => state.auth.userData?.$id);
    const userName = useSelector((state) => state.auth.userData?.name) || "Username doesn't exist !";
    const email = useSelector((state) => state.auth.userData?.email) || "Email-id doesn't exist !";

    const [userPost, setUserPost] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
    
        confService.getUserPosts({ userId }).then((posts) => {

            if(posts) {

                setUserPost(posts.documents);
                setLoading(false);
            }
        });

    }, []);
    
    return (

    <>
    
    <div className='w-10/12 m-auto px-6 py-8 bg-zinc-200 bg-opacity-70 rounded-lg  dark:bg-[#15016e]'>

        <div className='text-center text-black font-medium text-3xl dark:text-white'>
            <h2>Your Personal Dashboard</h2>
        </div>

        <div className="w-full">
            <div className="w-32 m-auto relative">
                <img src={flag} alt="User Avatar" className="w-32 mt-6 rounded-full bg-gradient-to-r from-[#db02be] via-[#fc0202] to-[#f5e904]" />
                
                <div className=" absolute bottom-4 right-0">
                    <ToolTip text={"Edit Profile"}>

                        <Link to="/user/edit-user-profile">
                            <FaUserEdit color={"#E60023"} size={"32px"} className="bg-[#f1eeee] rounded-full p-1 cursor-pointer" />
                        </Link>

                    </ToolTip>

                </div>

            </div>
        </div>

        <div className="mt-2 text-center tracking-wider">

            <h2 className="text-xl dark:text-white font-bold italic">@ {userName}</h2>
            <h4 className="mt-2 text-sm dark:text-white">{email}</h4>
        </div>

        <div className="mt-8">
            <h3 className="text-2xl text-center font-medium dark:text-white">Your's Post</h3>

        </div>

        <div className='dark:bg-[#0d043c] flex flex-wrap p-4 mt-4 rounded-xl'>

            {(!loading) ? (

                    (userPost.length > 0) ? (

                        userPost.map((post) => (
    
                            <div key={post.$id} className='w-1/4 p-2'>
    
                                <PostCard {...post} />
    
                            </div>
                        ))
                    ) : (
                        <div className='w-full h-16 bg-white rounded-xl flex items-center justify-center'>
                            <h2 className='text-xl font-normal text-red-600 animate-bounce dark:text-white'>No Post has been Found.</h2>
                        </div>
                    )
                    
                ) : (
                    
                    <div className='flex flex-col items-center justify-center w-full'>

                        <div className='w-20 h-20 border-2 border-[#df2121] rounded-full animate-spin border-t-transparent'></div>

                        <div className='flex items-center mt-10 bg-zinc-50 rounded-xl px-20 py-2'>
                            <Logo />
                        </div>

                    </div>
                )
            }

        </div>
    </div>
    </>
    );
}

export default Profile;