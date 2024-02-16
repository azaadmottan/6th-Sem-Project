import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../services/authService';
import { logout } from "../../slicer/authSlicer.js";

function LogoutBtn() {

    const dispatch = useDispatch();

    const logoutHandler = () => {

        authService.logout()
        .then(() => {

            dispatch(logout());
        });
    }


    return (
        <>
            <button 
                className="px-3 py-[6px] w-full rounded-xl bg-[#E60023] font-semibold transition-all delay-75 text-white hover:bg-red-700 dark:bg-[#ff2323] dark:hover:bg-[#d52020]"
                onClick={logoutHandler}
            >
            Sign out
            </button>
        </>
    );
}

export default LogoutBtn;