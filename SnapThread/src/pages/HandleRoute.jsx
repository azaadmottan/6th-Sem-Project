import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Logo } from '../components/index.js';

function HandleRoute() {

    const {"*": path} = useParams();

    return (
    <>
    <div className='bg-zinc-900 bg-opacity-95 text-white fixed top-0 z-50 w-full h-screen flex flex-col items-center justify-center'>

        <Logo textSize='text-4xl' imageWidth='w-20'/>

        <h3 className='mt-6 text-xl tracking-wider'>Requested URL : "<span className='text-blue-600'>{path}</span>"</h3>

        <h5 className='text-lg mt-2'>Unfortunately, this page doesn't exist.</h5>

        <h6 className='mt-6 text-xl text-blue-600 tracking-wider transition ease-linear hover:text-red-400 hover:underline '><Link to="/">GO TO HOME</Link></h6>
    </div>
    </>
    )
}

export default HandleRoute;