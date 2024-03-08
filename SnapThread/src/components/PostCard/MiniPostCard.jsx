import React from "react";
import confService from "../../services/confService";

function MiniPostCard({ title, featuredImage }) {

    return (

        <>
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
                    <h2 className='lg:ml-3 my-3 text-sm lg:text-xl font-semibold transition-all lg:hover:text-[#df2121]'>
                        { title }
                    </h2>
                }

            </div>
        </div>
    </>
    );
}

export default MiniPostCard;