import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, LogoutBtn, ThemeBtn } from "../index.js";
import { useSelector } from "react-redux";

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

    return (
        <>
        <header className="sticky top-0 z-10">
            <nav className="flex items-center justify-between bg-white px-6 py-5 font-semibold dark:bg-[#150d4c] dark:text-white">
            <ul className="flex items-center gap-4">
                <div className="flex items-center">
                <Link to="/" className="flex items-center">
                    <Logo />
                </Link>
                </div>
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
            </ul>

            <ul className="flex items-center gap-4">
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
                        ? "bg-[#E60023] text-white font-normal px-3 py-2 rounded-full hover:bg-red-700"
                        : ""
                    } ${
                        item.name === "Sign up"
                        ? "bg-zinc-200 text-black font-medium px-3 py-2 rounded-full hover:bg-zinc-300 dark:bg-zinc-100 dark:hover:bg-zinc-300"
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
                <button
                    className="px-3 py-2 rounded-full bg-zinc-200 font-medium text-black hover:bg-zinc-300"
                    onClick={() => navigate("/all-posts")}
                >
                    All Posts
                </button>
                )}

                {authStatus && (
                <button
                    className="px-3 py-2 rounded-full bg-zinc-200 font-medium text-black hover:bg-zinc-300"
                    onClick={() => navigate("/add-new-post")}
                >
                    Add Post
                </button>
                )}

                {authStatus && <LogoutBtn />}
            </ul>
            </nav>
        </header>
        </>
    );
}

export default Header;
