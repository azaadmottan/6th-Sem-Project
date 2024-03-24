import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../services/authService';
import { logout } from "../../slicer/authSlicer.js";
import ShowModal from '../Modal/ShowModal.jsx';

function LogoutBtn() {

    const dispatch = useDispatch();

    const logoutHandler = () => {

        authService.logout()
        .then(() => {

            dispatch(logout());
        });
    }

    const [showModal, setShowModal] = useState(false);

    
    const handleShowModal = () => {
        
        setShowModal(true);
    }
    
    return (
        <>
            <button 
                className="px-3 py-[6px] w-full rounded-xl bg-[#E60023] font-semibold transition-all delay-75 text-white hover:bg-red-700 dark:bg-[#ff2323] dark:hover:bg-[#d52020]"
                onClick={() => handleShowModal()}
            >
            Sign out
            </button>
            
            {
                showModal && (

                    <ShowModal 
                        title="Logout Modal" 
                        body="Are you sure you want to logout ?" 
                        buttonText="Logout"
                        onClose={() => setShowModal(false)} 
                        onSubmitHandler={() => logoutHandler()} 
                    />
                )
            }
        </>
    );
}

export default LogoutBtn;