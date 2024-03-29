import React, { useEffect, useState } from "react";
import confService from "../services/confService";
import { Logo } from "../components/index.js";

function Explore() {

    const [mostLikedPost, setMostLikedPost] = useState();
    const [loading, setLoading] = useState(true);

    const fetchMostLikedPost = async () => {

        try {

            const likedPosts = await confService.getMostLikedPost();
            setMostLikedPost(likedPosts);

            setLoading(false);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    useEffect(() => {
    
        fetchMostLikedPost();
    }, []);
    

    return (

    <div className='w-[96%] md:w-10/12 m-auto px-1 py-1 md:px-6 md:py-8 bg-zinc-200 bg-opacity-70 rounded-lg dark:bg-[#030131] dark:text-white'>

        <div className='text-center text-black dark:text-white font-medium text-xl md:text-3xl mt-3'>
            <h2>Explore the best of SnapThread</h2>
        </div>


        <div className='md:mt-6 lg:w-12/12 md:w-11/12 w-[95%]l m-auto p-1 md:p-4 md:border-2 md:border-red-600 rounded-xl relative z-0 select-none'>
            
        {
            (!loading && mostLikedPost) ? (
            <>
                <div>
                    <div className='mt-5 w-full h-[60vh] md:h-[80vh] m-auto p-[4px] md:p-2 border-2 border-red-600 rounded-lg relative z-0'>
                        <img 
                            src={confService.filePreview(mostLikedPost.featuredImage)} 
                            alt={mostLikedPost.title} 
                            className='h-[100%] md:h-[75vh] m-auto object-contain rounded-lg'
                        />
                    </div>

                </div>

                <div className='mt-6 bg-white px-4 py-4 rounded-xl relative dark:bg-[#0e125d] dark:text-white'>
                    <h2 className='md:text-xl text-lg font-extrabold'>{mostLikedPost.title}</h2>
                    <span className='absolute -top-2 right-2 bg-[#E60023] text-white px-2 text-xs sm:text-sm md:text-[18px] tracking-wider rounded-full cursor-context-menu' title={`Status: ${mostLikedPost.status}`}>{mostLikedPost.status}</span>
                </div>

                <div className='mt-6 bg-white px-4 py-4 rounded-xl dark:bg-[#0e125d] dark:text-white'>
                    <h3 className='text-[14px] tracking-wider md:text-lg font-medium italic'>{mostLikedPost.content}</h3>
                </div>

            </>
            ) : (
                <div className='flex flex-col items-center justify-center w-full mt-8'>

                    <div className='w-20 h-20 border-2 border-[#df2121] rounded-full animate-spin border-t-transparent'></div>

                    <div className='flex items-center mt-10 bg-zinc-50 rounded-xl px-20 py-2'>
                        <Logo />
                    </div>

                </div>
            )
            }
        </div>

    </div>

    );
}

export default Explore;