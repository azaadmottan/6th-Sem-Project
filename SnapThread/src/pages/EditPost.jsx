import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import confService from '../services/confService';
import { PostForm } from '../components';
import { useSelector } from 'react-redux';

function EditPost() {

    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        
        if (slug) {

            confService.getSinglePost(slug).then((post) => {

                if(post) {

                    setPost(post);
                }
            })
        }
        else {

            navigate("/");
        }
    }, [slug, navigate]);
    
    const userId = useSelector((state) => (state.auth.userData?.$id));
    const userName = useSelector((state) => (state.auth.userData?.name));
    
    const [isUserPostAuthor, setIsUserPostAuthor] = useState(false);

    useEffect(() => {
        

        const getLoggedInUser = () => {
    
            try {
                
                const postUserId = post;
        
                if (postUserId.userId === userId) {
        
                    setIsUserPostAuthor(true);
                }
            } catch (error) {
                
            }
        }
    
        getLoggedInUser();
    }, [post])
    

    return (post && isUserPostAuthor) ? (

    <>
        <PostForm post={post} />
    </>
    ) : (
    <>
        <div className='w-8/12 m-auto px-6 py-8 bg-zinc-200 bg-opacity-70 rounded-lg dark:bg-[#15016e]'>

            <div className='text-center'>

                <h2 className='text-red-600 text-3xl font-semibold dark:text-white'>@ {userName}</h2>
                <h2 className='text-2xl mt-4 font-normal dark:text-white'>Current User is not Authorized to Edit Post.</h2>
            </div>

        </div>
    </>
    );
}

export default EditPost;