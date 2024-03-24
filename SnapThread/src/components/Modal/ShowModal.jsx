import React from "react";

function ShowModal({ 
    title,
    body,
    buttonText,
    onClose,
    onSubmitHandler
}) {

    return (

    <>
    <div className="fixed z-10 top-0 left-0 h-full w-screen flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
        <div className="bg-white px-6 py-4 rounded-lg md:w-96 dark:text-black">

            <div className="text-2xl font-bold mb-6">
                <h3>{title}</h3>
            </div>

            <div className="text-xl font-medium my-8">
                <p>{body}</p>
            </div>

            <div className="flex items-center justify-around">

                <button 
                    className="bg-zinc-400 font-semibold px-4 py-2 rounded-lg hover:bg-opacity-80"
                    onClick={() => (onClose())}
                >Close</button>
                <button 
                    className="bg-[#E60023] font-semibold text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    onClick={() => onSubmitHandler()}
                >{buttonText}</button>

            </div>

        </div>
    </div>
    </>

    );
}

export default ShowModal;