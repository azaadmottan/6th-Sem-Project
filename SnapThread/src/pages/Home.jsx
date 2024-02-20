import React from 'react';
import config from '../config/config.js';

function Home() {

    return (
        <>
        <section className='mx-auto w-full'>
            <section className='w-full md:h-[90vh] px-6 py-8 lg:px-[160px] lg:py-[50px] flex flex-col md:flex md:flex-row gap-10 bg-gradient-to-br from-[#f98d8d] to-[#9f33f8] dark:bg-gradient-to-br dark:from-[#f74444] dark:to-[#8304eb]'>
                <div className='w-[80%] m-auto lg:w-[50%]'>
                <img alt="crispy chicken recipe" className='lg:w-[400px] lg:h-[400px] md:w-[660px] md:h-[70vh] m-auto w-[50vw] h-[40vh] rounded-3xl' src="https://i.pinimg.com/474x/09/af/e8/09afe85ff17be74f5f5c0753325eecf4.jpg" />
                </div>

                <div className='w-[100%] mx-auto lg:w-[50%]'>   
                    <h2 className='w-full xl:text-5xl lg:text-3xl md:text-2xl sm:text-lg text-pink-100 font-bold text-center mt-4 md:mt-20'>Capture moments, weave memories.</h2>

                    <p className='xl:text-xl lg:text-[18px] md:text-[14px] text-sm text-pink-300 mt-8 text-center md:w-[70%] m-auto lg:text-xl'>What do you want to try next? Think of something you're into—like “Connecting hearts through pixels. SnapThread, where memories meet moments”.</p>
                </div>
            </section>

            <section className='w-[100%] md:h-[100vh] px-6 py-8 lg:px-[160px] lg:py-[50px] flex flex-col-reverse md:flex md:flex-row gap-10 bg-gradient-to-br from-[#fa87fa] to-[#fc455a] dark:bg-gradient-to-br dark:from-[#f94af9] dark:to-[#ff001e]'>

                <div className='w-full md:w-[50%]'>   
                    <h2 className='xl:text-5xl lg:text-3xl md:text-2xl sm:text-lg text-pink-100 font-bold text-center md:mt-48'>Save ideas you like.</h2>

                    <p className='xl:text-xl lg:text-[18px] md:text-[14px] text-sm text-pink-200 mt-8 text-center md:w-[60%] m-auto lg:text-xl'>Every picture tells a story. Let "SnapThread" help you write yours.</p>
                </div>

                <div className='w-full md:w-[50%] lg:mt-4'>

                <img alt="future home vibes couch" className='w-[50vw] m-auto h-[50vh] md:h-[70vh] md:w-[30vw] md:mt-10' src="https://s.pinimg.com/webapp/future-home2-31c812cc.png"></img>
                </div>
                
            </section>

            <section className='w-[100%] h-[50vh] md:h-[95vh] px-6 py-8 lg:px-[160px] lg:py-[50px] flex bg-gradient-to-br from-[#fb79e5] to-[#6551fb] dark:bg-gradient-to-br dark:from-[#fb40dc] dark:to-[#2004f3]'>

                <div className='m-auto'>   
                    <h2 className='2xl:text-6xl xl:text-5xl lg:text-3xl md:text-2xl sm:text-lg text-pink-200 font-bold text-center lg:mt-42'>See it, make it, try it, do it.</h2>

                    <p className='xl:text-xl lg:text-[18px] md:text-[14px] text-sm text-pink-100 mt-8 text-center md:w-[45%] sm:w-[70%] m-auto lg:text-xl'>The best part of "SnapThread" is discovering new things and ideas from people around the world.</p>
                </div>
            </section>


            <section className='w-[100%] h-[35vh] sm:h-[50vh] md:h-[90vh] text-white flex items-center justify-center bg-[url("https://wallpapers.com/images/featured/pinterest-background-urm1zdm2gj236gbq.jpg")] bg-cover bg-no-repeat object-contain bg-black bg-blend-color-burn bg-opacity-70'>

                <div className='md:w-[50%]'>
                    <h2 className='text-center leading-[90px] 2xl:text-6xl xl:text-5xl lg:text-3xl md:text-2xl sm:text-lg font-semibold'>Sign up Now to get your ideas...</h2>
                </div>
                
            </section>
            
        </section>
        </>
    )
}

export default Home;