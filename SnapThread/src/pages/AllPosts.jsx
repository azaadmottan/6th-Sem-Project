import React, { useState, useEffect } from 'react'
import confService from '../services/confService';
import { Logo, PostCard } from '../components/index.js';

function AllPosts() {

    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        confService.getAllPost([]).then((posts) => {
    
            if(posts) {
    
                setAllPosts(posts.documents);
                setLoading(false);
            }
        });
    }, [])


    return (

    <>
    <div className='w-10/12 m-auto px-6 py-8 bg-zinc-200 bg-opacity-70 rounded-lg dark:bg-[#030131]'>

        <div className='text-center text-black font-medium text-3xl dark:text-white'>
            <h2>Featured Images</h2>
        </div>

        <div className='flex flex-wrap p-4 mt-4'>

            {(!loading) ? (

                    (allPosts.length > 0) ? (

                        allPosts.map((post) => (
    
                            <div key={post.$id} className='w-1/4 p-2'>
    
                                <PostCard {...post} />
    
                            </div>
                        ))
                    ) : (
                        <div className='w-full h-16 bg-white rounded-xl flex items-center justify-center'>
                            <h2 className='text-xl font-normal text-red-600 animate-bounce'>No Post has been Found.</h2>
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

export default AllPosts;