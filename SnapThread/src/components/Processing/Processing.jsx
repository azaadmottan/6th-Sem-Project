import React from "react";

function Processing() {
    
    return (
    <>
        <div
            className="mt-10 bg-blue-700 text-white rounded-lg flex items-center justify-center p-2"
            title="Please wait for server response."
        >
            <div className="flex items-center justify-center">
            <span
                className=" h-6 w-6 mr-4 border-2 border-[#fdfcfc] rounded-full animate-spin border-t-transparent"
                viewBox="0 0 24 24"
            ></span>
            <span className="text-lg tracking-wider">Processing...</span>
            </div>
        </div>
    </>
    );
}

export default Processing;
