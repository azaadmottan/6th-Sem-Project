import React from 'react';
import LogoIcon from "../../assets/logo-512x512.png";

function Logo(
    imageWidth = "w-20",
    textSize = "text-xl"
) {

    return (
    <>
        <div className='flex items-center gap-4'>
            <img 
                src={LogoIcon} alt="SnapThread" 
                className={`${imageWidth}`}
            />
            <span className={`${textSize}`}>SnapThread</span>
        </div>
    </>
    );
}

export default Logo;