import React, { useState } from 'react';

function ToolTip({ text, left, right, children }) {

    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (

    <div className="relative inline-block">

        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

            {children}

        </div>

        {
            showTooltip && (

            <div className={`absolute ${left} ${right} z-10 p-2 bg-gray-900 bg-opacity-85 text-white tracking-wider font-medium text-sm rounded-lg shadow-md whitespace-nowrap top-14 left-1/2 transform -translate-x-1/2`}>

                {text}

            </div>
            )
        }
    </div>

    );
}

export default ToolTip;