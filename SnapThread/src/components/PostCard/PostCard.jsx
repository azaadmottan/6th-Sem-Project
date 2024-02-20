import React from 'react'
import { Link } from 'react-router-dom';
import confService from '../../services/confService';
import { FaHeart ,FaRegComment } from "react-icons/fa";



function PostCard({ $id, title, featuredImage }) {

    return (

    <>
        <Link to={`/post/${$id}`}>
            <div className='bg-white p-2 rounded-xl transition-colors ease-in-out delay-150 hover:shadow-zinc-700 shadow-lg dark:bg-[#0e125d] dark:text-white'>

                <div >
                    <div className='overflow-hidden rounded-xl'>
                        <img 
                            src={confService.filePreview(featuredImage)} 
                            alt={title} 
                            className='rounded-xl lg:hover:scale-110 lg:transition lg:ease-linear' 
                        />
                    </div>

                    {
                        <h2 className='lg:ml-3 my-3 text-sm lg:text-xl font-semibold lg:hover:text-[#df2121]'>
                            { title }
                        </h2>
                    }

                    <div className='flex items-center md:flex-col md:items-start md:justify-start lg:ml-3 lg:my-2 gap-4'>
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