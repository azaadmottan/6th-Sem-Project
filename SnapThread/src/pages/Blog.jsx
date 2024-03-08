import React, { useState, useEffect } from "react";
import confService from '../services/confService.js';
import { MiniPostCard, Logo } from "../components";
import { useSelector } from "react-redux";

function Blog() {

    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        confService.getAllPost([]).then((posts) => {
    
            if(posts) {
    
                setAllPosts(posts.documents);
                setLoading(false);
            }
        });
    }, []);

    return (

    <>
    <div className='w-[90%] md:w-10/12 m-auto px-2 py-4 md:px-6 md:py-8 bg-zinc-200 bg-opacity-70 rounded-lg dark:bg-[#15016e]'>

        <div className='text-center text-black font-medium text-xl md:text-3xl dark:text-white'>
            <h2>Mini Blogs</h2>
        </div>

        {   
            (!(useSelector((state) => state.auth.status))) ? (
                
                    
                    <div className='dark:bg-[#0d043c] p-4 mt-4 rounded-xl'>
                        <div className="p-3">
                            <h2 className="text-center text-xl text-white">Sign in now  to see the blog posts!</h2>
                        </div>
                    </div>
            ) : (

                <div className='dark:bg-[#0d043c] grid gap-4 md:grid-cols-3 lg:grid-cols-4 grid-cols-1 p-4 mt-4 rounded-xl'>

                    {(!loading) ? (

                            (allPosts.length > 0) ? (

                                allPosts.map((post) => (

                                    <div key={post.$id} className='md:w-3/3 lg:w-4/4 md:p-2'>

                                        <MiniPostCard {...post} />

                                    </div>
                                ))
                            ) : (
                                <div className='w-full h-16 bg-white rounded-xl flex items-center justify-center'>
                                    <h2 className='text-xl font-normal text-red-600 animate-bounce dark:text-white'>No Post has been Found.</h2>
                                </div>
                            )
                            
                        ) : (
                            
                            <div className='flex flex-col md:w-[75vw] m-auto  items-center justify-center w-full'>

                                <div className='w-20 h-20 border-2 border-[#df2121] rounded-full animate-spin border-t-transparent'></div>

                                <div className='flex items-center mt-10 bg-zinc-50 rounded-xl px-2 py-1 md:px-20 md:py-2'>
                                    <Logo />
                                </div>

                            </div>
                        )
                    }

                </div>
            )

        }

    </div>
    </>
    );
}

export default Blog;