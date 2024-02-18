import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectRoutes, SignIn, SignUp } from "./components/index.js";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Business from "./pages/Business.jsx";
import Explore from "./pages/Explore.jsx";
import Watch from "./pages/Watch.jsx";
import Today from "./pages/Today.jsx";
import AddNewPost from "./pages/AddNewPost.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import EditPost from "./pages/EditPost.jsx";
import HandleRoute from "./pages/HandleRoute.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";


const router = createBrowserRouter([

   {
      path: "/",
      element: <App />,
      children: [
         {
            path: "/",
            element: <Home />,
            
         },
         {
            path: "/today",
            element: <Today />,
            
         },
         {
            path: "/watch",
            element: <Watch />,
            
         },
         {
            path: "/explore",
            element: <Explore />,
            
         },
         {
            path: "/about",
            element: <About />,
            
         },
         {
            path: "/business",
            element: <Business />,
            
         },
         {
            path: "/blog",
            element: <Blog />,
            
         },
         {
            path: "/signUp",
            element: (
               <ProtectRoutes authentication={false} >
                  <SignUp />
               </ProtectRoutes>
            )
         },
         {
            path: "/signIn",
            element: (
               <ProtectRoutes authentication={false}>
                  <SignIn />
               </ProtectRoutes>
            )
         },
         {
            path: "/user-profile",
            element: (
               <ProtectRoutes authentication={true}>
                  <Profile />
               </ProtectRoutes>
            )
         },
         {
            path: "/user/edit-user-profile",
            element: (
               <ProtectRoutes authentication={true}>
                  <EditProfile />
               </ProtectRoutes>
            )
         },
         {
            path: "/all-posts",
            element: (
               <ProtectRoutes authentication={true}>
                  <AllPosts />
               </ProtectRoutes>
            )
         }, 
         {
            path: "/add-new-post",
            element: (
               <ProtectRoutes authentication={true}>
                  <AddNewPost />
               </ProtectRoutes>
            )
         }, 
         {
            path: "/edit-post/:slug",
            element: (
               <ProtectRoutes authentication={true}>
                  <EditPost />
               </ProtectRoutes>
            )
         }, 
         {
            path: "/post/:slug",
            element: (
               <ProtectRoutes authentication={true}>
                  <Post />
               </ProtectRoutes>
            )
         },
         {
            path: "*",
            element: <HandleRoute />,
         }
      ]
   }
]);


ReactDOM.createRoot(document.getElementById("root")).render(

   <React.StrictMode>

      <Provider store={store}>

         <RouterProvider router={router} />

      </Provider>
      
   </React.StrictMode>
);
