import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import confService from '../services/confService';
import { PostForm } from '../components';

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
    


    return (post) ? (

    <>
        <PostForm post={post} />
    </>
    ) : (null);
}

export default EditPost;