import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loading } from "./index.js";



function ProtectRoutes({ children, authentication = true }) {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const authStatus = useSelector(state => state.auth.status);


    useEffect(() => {

        if(authentication && authStatus !== authentication ) {

            navigate("/signIn");
        }
        else if(!authentication && authStatus !== authentication) {

            navigate("/");
        }

        setLoading(false);
    
    }, [navigate, authStatus, authentication])
    

    return loading ? <Loading /> : <>{children}</>;
}

export default ProtectRoutes;