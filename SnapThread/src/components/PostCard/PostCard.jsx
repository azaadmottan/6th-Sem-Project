import React from 'react'
import { Link } from 'react-router-dom';
import confService from '../../services/confService';
import { FaHeart ,FaRegComment } from "react-icons/fa";



function PostCard({ $id, title, featuredImage }) {

    return (

    <>
        <Link to={`/post/${$id}`}>
            <div className='bg-white p-2 rounded-xl transition-colors ease-in-out delay-150 hover:shadow-zinc-500 shadow-lg dark:bg-[#1e1b8f] dark:text-white'>

                <div >
                    <div className='overflow-hidden rounded-xl'>
                        <img 
                            src={confService.filePreview(featuredImage)} 
                            alt={title} 
                            className='rounded-xl hover:scale-110 transition ease-linear' 
                        />
                    </div>

                    {
                        <h2 className='ml-3 my-3 text-xl font-semibold hover:text-[#df2121]'>
                            { title }
                        </h2>
                    }

                    <div className='flex items-center ml-3 my-2 gap-4'>
                        {/* <FaRegHeart size={"25px"} /> */}
                        <span className='flex items-center gap-2 text-md font-medium'>
                            <FaHeart color={"#ff2626"} size={"23px"} /> Likes
                        </span>
                        <span className='flex items-center gap-2 text-md font-medium'>
                            <FaRegComment color={"#E60023"} size={"23px"} /> Comments
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    </>
    );
}

export default PostCard;