import React, { useCallback, useEffect, useState } from "react";
import { BsMoonStars } from "react-icons/bs";
import { LuSun } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../slicer/authSlicer";
import ToolTip from "../ToolTip/ToolTip";


function ThemeBtn() {

    const [mode, setMode] = useState(() => localStorage.getItem('snapTheme') || 'light');

    const handleToggleTheme = () => {

        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);

        localStorage.removeItem("snapTheme");
        localStorage.setItem('snapTheme', newMode);

        document.querySelector("html").classList.remove("light", "dark");
        document.querySelector("html").classList.add(newMode);            
        
    };
    
    useEffect(() => {

        const existingTheme = localStorage.getItem('snapTheme');
        
        if (existingTheme) {

            setMode(existingTheme);

            document.querySelector("html").classList.remove("light", "dark");
            document.querySelector("html").classList.add(existingTheme);            
        }
    }, []);
    
    return (
    <>
        <ToolTip text={`Switch to ${mode === "light" ? "Dark" : "Light"} mode.`} left="-left-10">

        <button 
            className="bg-zinc-200 p-3 rounded-full hover:bg-zinc-300 dark:bg-zinc-100 dark:hover:bg-white"
            onClick={handleToggleTheme}
        >
            {
                (mode === "light") ? (
                    
                        <BsMoonStars size="20px" color="black" />
                    ) : (
                        
                        <LuSun size="20px" color="black" />
                    )
            }
        </button>
        </ToolTip>

    </>
    );
}

export default ThemeBtn;