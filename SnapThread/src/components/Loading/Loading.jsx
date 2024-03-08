import React from 'react'
import { Logo } from "../index.js";


function Loading() {

    return (
    <>
        <div className='bg-opacity-70 w-full min-h-screen px-4 md:px-0 flex flex-col items-center justify-center text-center'>

                <div className='flex mb-5'>
                    <Logo textSize='text-xl md:text-4xl font-bold' />
                </div>

                <h2 className='text-lg md:text-2xl font-semibold'>
                    Get your next <span className='text-blue-600'>home decor idea,</span> <span className=' text-red-600'>outfit idea,</span> <span className=' text-orange-600'>DIY idea,</span> <span className=' text-lime-600'>chai time snacks idea</span>
                </h2>

                <p className='text-sm md:text-lg mt-1 italic'>Because every picture is worth a thousand words. Discover your story at SnapThread.</p>

        </div>
    </>
    )
}

export default Loading;