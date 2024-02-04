import React, { useCallback } from "react";
import { BsMoonStars } from "react-icons/bs";
import { LuSun } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../slicer/authSlicer";


function ThemeBtn() {

    const mode = useSelector((state) => state.auth.mode);
    const dispatch = useDispatch();

    const handleToggleTheme = useCallback(() => {

        dispatch(toggleTheme());
        
        // document.querySelector("html").classList.remove("light", "dark");
        // document.querySelector("html").classList.add(mode);
    }, [dispatch]);

    return (
    <>
        <button 
            className="bg-zinc-200 p-3 rounded-full dark:bg-zinc-100 dark:hover:bg-zinc-300"
            onClick={handleToggleTheme}
        >
            {
                (mode === "light") ? (

                    <BsMoonStars size="20px" title="Change to Dark Mode" />
                ) : (
                    
                    <LuSun size="20px" color="black"  title="Change to Light Mode" />
                )
            }
        </button>

    </>
    );
}

export default ThemeBtn;