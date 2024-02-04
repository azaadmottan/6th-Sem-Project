import React from 'react';
import config from '../config/config.js';

function Home() {

    return (
        <>
        <section className='mx-auto'>
            <section className='w-[100%] h-[90vh] px-[160px] py-[50px] flex gap-10 bg-gradient-to-br from-[#f98d8d] to-[#9f33f8] dark:bg-gradient-to-br dark:from-[#f74444] dark:to-[#8304eb]'>
                <div className='w-[50%]'>
                <img alt="crispy chicken recipe" className='w-[65vh] h-[70vh] rounded-3xl' src="https://i.pinimg.com/474x/09/af/e8/09afe85ff17be74f5f5c0753325eecf4.jpg" />
                </div>

                <div className='w-[50%]'>   
                    <h2 className='text-5xl text-pink-100 font-bold text-center mt-20'>Capture moments, weave memories.</h2>

                    <p className='text-pink-300 mt-8 text-center w-[70%] m-auto text-xl'>What do you want to try next? Think of something you're into—like “Connecting hearts through pixels. SnapThread, where memories meet moments”.</p>
                </div>
            </section>

            <section className='w-[100%] h-[100vh] px-[160px] py-[50px] flex gap-10 bg-gradient-to-br from-[#fa87fa] to-[#fc455a] dark:bg-gradient-to-br dark:from-[#f94af9] dark:to-[#ff001e]'>

                <div className='w-[50%]'>   
                    <h2 className='text-5xl text-pink-100 font-bold text-center mt-48'>Save ideas you like.</h2>

                    <p className='text-pink-200 mt-8 text-center w-[60%] m-auto text-xl'>Every picture tells a story. Let "SnapThread" help you write yours.</p>
                </div>

                <div className='w-[50%] mt-14'>

                <img alt="future home vibes couch" className='w-[65vh] h-[70vh]' src="https://s.pinimg.com/webapp/future-home2-31c812cc.png"></img>
                </div>
                
            </section>

            <section className='w-[100%] h-[95vh] px-[160px] py-[50px] flex bg-gradient-to-br from-[#fb79e5] to-[#6551fb] dark:bg-gradient-to-br dark:from-[#fb40dc] dark:to-[#2004f3]'>

                <div className='m-auto'>   
                    <h2 className='text-6xl text-pink-200 font-bold text-center mt-42'>See it, make it, try it, do it.</h2>

                    <p className='text-pink-100 mt-8 text-center w-[45%] m-auto text-xl'>The best part of "SnapThread" is discovering new things and ideas from people around the world.</p>
                </div>
            </section>


            <section className='w-[100%] h-[90vh] text-white flex items-center justify-center bg-[url("https://wallpapers.com/images/featured/pinterest-background-urm1zdm2gj236gbq.jpg")] bg-cover bg-no-repeat object-contain bg-black bg-blend-color-burn bg-opacity-70'>

                <div className='w-[50%]'>
                    <h2 className='text-center leading-[90px] text-6xl font-semibold'>Sign up Now to get your ideas...</h2>
                </div>
                
            </section>
            
        </section>
        </>
    )
}

export default Home;