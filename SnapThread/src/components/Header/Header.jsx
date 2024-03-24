import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, LogoutBtn, ThemeBtn, ToolTip } from "../index.js";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";


function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    const navigate = useNavigate();

    const navItems = [
        {
        name: "Today",
        slug: "/today",
        active: true,
        },
        {
        name: "Watch",
        slug: "/watch",
        active: true,
        },
        {
        name: "Explore",
        slug: "/explore",
        active: true,
        },
    ];

    const impNavItems = [
        {
        name: "About",
        slug: "/about",
        active: true,
        },
        {
        name: "Business",
        slug: "/business",
        active: true,
        },
        {
        name: "Blog",
        slug: "/blog",
        active: true,
        },
        {
        name: "Sign in",
        slug: "/signIn",
        active: !authStatus,
        // active: false,
        },
        {
        name: "Sign up",
        slug: "/signUp",
        active: !authStatus,
        // active: false,
        },
    ];

    const [open, setOpen] = useState(false);

    const profileRef = useRef();
    const menuRef = useRef();

    window.addEventListener("click", (e) => {

        if (profileRef.current && !profileRef.current.contains(e.target)){
            
            setOpen(false);
        }
    });

    const [openMenu, setOpenMenu] = useState(false);

    return (
        <>
        <header className="sticky top-0 z-10">
            <nav className="flex items-center justify-between lg:flex lg:flex-row lg:items-center lg:justify-between bg-white shadow-lg px-6 py-5 font-semibold dark:bg-gradient-to-r dark:from-[#2900a2] dark:to-[#eb042b] dark:text-white relative">

            <ul className="lg:flex lg:flex-row lg:items-center lg:gap-4">
                <div className="flex items-center lg:flex lg:items-center">
                <Link to="/" className="flex items-center">

                    <ToolTip text="Explore SnapThread">
                        <Logo />
                    </ToolTip>
                </Link>
                </div>

                <div className={`absolute lg:static top-[84px] left-0 bg-black bg-opacity-75 w-full lg:w-auto lg:bg-transparent flex flex-col items-center justify-center gap-2 lg:flex lg:flex-row lg:gap-4 ${openMenu ? 'block' : 'hidden'}`}>
                {navItems.map((item) =>
                item.active ? (
                    <button
                    onClick={() => navigate(item.slug)}
                    key={item.name}
                    className="px-2 py-2 rounded-md transition-colors ease-linear delay-100 duration-100 hover:bg-zinc-300 hover:bg-opacity-60 hover:text-[#ff0000] dark:hover:bg-zinc-100"
                    >
                    {item.name}
                    </button>
                ) : null
                )}
                </div>
            </ul>

            <ul className={`absolute lg:static top-[220px] left-0 bg-black bg-opacity-75 w-full lg:w-auto p-4 lg:bg-transparent flex flex-col items-center justify-center gap-2 lg:p-0 lg:flex lg:flex-row lg:items-center lg:gap-4 ${openMenu ? 'block' : 'hidden'}`}>
                {impNavItems.map((item) =>
                item.active ? (
                    <button
                    onClick={() => navigate(item.slug)}
                    key={item.name}
                    className={`${
                        !(item.name === "Sign in" || item.name === "Sign up")
                        ? "px-2 py-2 rounded-md transition-colors ease-linear delay-100 duration-100 hover:bg-zinc-300 hover:text-[#ff0000] hover:bg-opacity-60 dark:hover:bg-zinc-100"
                        : ""
                    } ${
                        item.name === "Sign in"
                        ? `bg-[#E60023] text-white font-semibold px-3 py-2 rounded-full transition-all delay-75 hover:bg-red-700 dark:bg-[#ff2323] dark:hover:bg-[#f7f5f5] dark:hover:text-[#E60023]`
                        : ""
                    } ${
                        item.name === "Sign up"
                        ? "bg-zinc-200 text-black font-semibold px-3 py-2 rounded-full hover:bg-zinc-300 dark:bg-zinc-100 dark:hover:bg-white"
                        : ""
                    } `}
                    >
                    {item.name}
                    </button>
                ) : null
                )}

                <div>
                    <ThemeBtn />
                </div>
                    
                {authStatus && (

                    <div 
                        className="bg-zinc-200 p-2 rounded-full hover:bg-zinc-300 dark:bg-zinc-100 dark:hover:bg-white relative"
                        onClick={() => setOpen(true)}
                        ref={profileRef} 
                    >

                        <FaRegUserCircle size="27px" className="cursor-pointer" color="black"
                        />
                        <span className="absolute top-0 right-0">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#322cf7] opacity-96"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#402bfb]"></span>
                            </span>
                        </span>

                        {open && (

                            <div 
                                className="bg-white w-32 rounded-xl px-3 py-2 flex items-center flex-col gap-2 absolute lg:-left-16 lg:top-12 -right-32 -top-28"
                                ref={menuRef}
                            >
                                
                                {authStatus && (
                                    <button
                                        className="px-3 py-[3px] w-full rounded-xl bg-zinc-300 font-semibold text-black hover:bg-zinc-200"
                                        onClick={() => navigate("/user-profile")}
                                    >
                                        Profile
                                    </button>
                                )}

                                {authStatus && (
                                    <button
                                        className="px-3 py-[3px] w-full rounded-xl bg-zinc-300 font-semibold text-black hover:bg-zinc-200"
                                        onClick={() => navigate("/add-new-post")}
                                    >
                                        Add Post
                                    </button>
                                )}

                                {authStatus && (
                                    <button
                                        className="px-3 py-[3px] w-full rounded-xl bg-zinc-300 font-semibold text-black hover:bg-zinc-200"
                                        onClick={() => navigate("/all-posts")}
                                    >
                                        All Posts
                                    </button>
                                )}

                                {authStatus && <LogoutBtn />}
                            </div>
                        )}
                    </div>
                )
                }

            </ul>

            <div className="lg:hidden flex items-center justify-center">
                <div onClick={() => setOpenMenu(!openMenu)}>
                    {
                        !(openMenu) ? (

                            <RxHamburgerMenu className="text-3xl font-bold cursor-pointer" />
                        ) : (
                            
                            <IoClose className="text-3xl font-bold cursor-pointer" />
                        )
                    }
                </div>
            </div>

            </nav>
        </header>
        </>
    );
}

export default Header;
