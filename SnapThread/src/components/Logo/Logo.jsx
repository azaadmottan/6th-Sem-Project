import React from 'react';
import LogoIcon from "../../assets/logo-512x512.png";

function Logo({
        imageWidth = "w-12",
        textSize = "text-2xl"
    })  
{

    return (
    <>
        <div className='flex items-center gap-2'>
            <img 
                src={LogoIcon} alt="SnapThread" 
                className={`${imageWidth}`}
            />
            <span className={`${textSize} text-[#ff0000]`}>SnapThread</span>
        </div>
    </>
    );
}

export default Logo;