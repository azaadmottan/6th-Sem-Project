import React, { useEffect, useState } from "react";
import { Footer, Header, Loading } from "./components/index.js";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./services/authService.js";
import { login, logout } from "./slicer/authSlicer.js";


function App() {

   const [loading, setLoading] = useState(true);

   const dispatch = useDispatch();

   const location = useLocation();

   const isHomePage = location.pathname === "/";

   useEffect(() => {

      authService.getCurrentUser()
      .then((userData) => {
   
         if(userData) {
   
            dispatch(login());
         }
         else {
   
            dispatch(logout());
         }
      })
      .finally(() => setLoading(false));

   }, []);
   

   return (!loading) ? (<>

      <Header />

         <main className={`${!isHomePage && "dark:bg-[#0d043c] py-8 min-h-[85vh]"}`}>

            <Outlet />

         </main>

      <Footer />

   </>) : (<Loading />);

}

export default App;
