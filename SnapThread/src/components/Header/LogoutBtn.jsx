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
                className="px-3 py-2 rounded-full bg-[#E60023] font-normal text-white hover:bg-red-700"
                onClick={logoutHandler}
            >
            Sign out
            </button>
        </>
    );
}

export default LogoutBtn;