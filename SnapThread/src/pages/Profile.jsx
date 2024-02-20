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
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [aboutUser, setAboutUser] = useState("");

    useEffect(() => {
        
        confService.getUserProfileData({ userId }).then((profileData) => {

            const avatarId = profileData.documents[0].avatarId;
            const aboutUser =  profileData.documents[0].aboutUser;

            confService.getUserProfilePicture(avatarId).then((picture) => {

                if (picture) {

                    setUserProfilePicture(picture);
                }
                else {

                    setUserProfilePicture(flag);
                }
            });

            setAboutUser(aboutUser);
        });

        confService.getUserPosts({ userId }).then((posts) => {

            if(posts) {

                setUserPost(posts.documents);
                setLoading(false);
            }
        });

    }, []);
    
    return (

    <>
    
    <div className='w-[90%] md:w-10/12 m-auto px-2 py-4 md:px-6 md:py-8 bg-zinc-200 bg-opacity-70 rounded-lg  dark:bg-[#15016e]'>

        <div className='text-center text-black font-medium text-xl md:text-3xl dark:text-white'>
            <h2>Your Personal Dashboard</h2>
        </div>

        <div className="w-full">
            <div className="w-40 m-auto relative">
                <div className="flex items-center justify-center">
                    {
                    (!loading) ? (

                        <img src={userProfilePicture ? userProfilePicture : flag} alt="User Avatar" className="w-40 h-40 mt-6 rounded-full object-center object-contain p-1 bg-gradient-to-r from-[#db02be] via-[#fc0202] to-[#f5e904] lg:hover:cursor-zoom-out lg:hover:scale-150 lg:transition-all lg:delay-75 lg:hover:z-20 relative" />
                    ) : (
                        <div className='w-20 h-20 border-2 border-[#df2121] rounded-full animate-spin border-t-transparent'></div>
                    )
                    }
                </div>
                
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

            <h2 className="text-lg md:text-xl dark:text-white font-bold italic">@ {userName}</h2>
            <h4 className="mt-2 text-sm dark:text-white">{email}</h4>

            <h5 className="mt-4 w-[60vw] m-auto text-xs md:text-lg text-center dark:text-white">About User: {aboutUser}</h5>
        </div>

        <div className="mt-8">
            <h3 className="md:text-2xl text-xl text-center font-medium dark:text-white">Your's Post</h3>

        </div>

        <div className='dark:bg-[#0d043c] grid gap-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 p-4 mt-4 rounded-xl'>

            {(!loading) ? (

                    (userPost.length > 0) ? (

                        userPost.map((post) => (
    
                            <div key={post.$id} className='md:w-3/3 lg:w-4/4 md:p-2'>
    
                                <PostCard {...post} />
    
                            </div>
                        ))
                    ) : (
                        <div className='w-full h-16 bg-white rounded-xl flex items-center justify-center dark:bg-[#0d043c]'>
                            <h2 className='text-lg md:text-xl font-normal text-red-600 animate-bounce dark:text-white'>No Post has been Found.</h2>
                        </div>
                    )
                    
                ) : (
                    
                    <div className='flex flex-col md:w-[75vw] m-auto items-center justify-center w-full'>

                        <div className='w-20 h-20 border-2 border-[#df2121] rounded-full animate-spin border-t-transparent'></div>

                        <div className='flex items-center mt-10 bg-zinc-50 rounded-xl px-2 py-1 md:px-20 md:py-2'>
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