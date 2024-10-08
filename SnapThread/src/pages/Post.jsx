import React, { useState, useEffect, useId } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import confService from "../services/confService.js";
// import authService from '../services/authService.js';
import { Logo, ShowModal } from '../components/index.js';
import { FaRegHeart, FaHeart ,FaRegComment, FaComment, FaUser } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useForm } from 'react-hook-form';


function Post() {

    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    
    const userId = useSelector((state) => state.auth.userData?.$id);
    const userName = useSelector((state) => state.auth.userData?.name);

    const isAuthor = post && userId ? post.userId === userId : false;

    useEffect(() => {

        if (slug) {

            confService.getSinglePost(slug).then((post) => {

                if (post) {

                    setPost(post);
                    setLoading(false);
                }
                else {

                    navigate("/");
                }
            });          
        }
        else {

            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {

        confService.deletePost(post.$id).then((status) => {

            if(status) {

                confService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        })
    }

    const [showModal, setShowModal] = useState(false);

    const handleDeleteModal = () => setShowModal(true);

    const [like, setLike] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    
    const handleLike = async() => {
        
        // setLike(!like);
        setLike(prevLike => !prevLike);

        try {
            
            const featuredImage = post.featuredImage;
            await confService.likePost({ userId, userName, featuredImage });
        } catch (error) {
            
            console.log(`Error: ${error}`);
        }
    }

    
    const fetchLikes = async() => {

        try {
            
            const featuredImage = await post?.featuredImage;
            await confService.getLikes({ featuredImage }).then((like) => {

                like.documents.map((post) => {

                    if (post.userId === userId){
                        
                        setLike(true);
                    }
                })
                setTotalLikes(like.total);
            });
        } catch (error) {
            
        }

    }

    setTimeout(() => {
        
        fetchLikes();
    }, 1200);
    
    // useEffect(() => {
        
    //     // fetchLikes();
    // }, [like]);

    const [comment, setComment] = useState(false);

    const handleComment = () => {

        setComment(!comment);
    }


    const {register, handleSubmit, reset} = useForm();

    const createComment = async(data) => {

        try {

            const featuredImage = post.featuredImage;
            const commentContent = data.commentContent;

            const comment = await confService.createComment({ userId, userName, commentContent, featuredImage });

            reset();

            fetchComments();

        } catch (error) {
            
            console.log("Error comment: ", error);
        }
    }

    const [totalComment, setTotalComment] = useState([]);

    const fetchComments = () => {
        
        try {
            
            const featuredImage = post.featuredImage;
            confService.getAllComments({ featuredImage }).then((comments) => {
    
                if (comments) {
        
                    setTotalComment(comments.documents);
                }
                else {
        
                    setTotalComment("No Comment found on this post !");
                }
            });
        } catch (error) {
            
        }
    }

    setTimeout(() => {
        
        // fetchComments();
    }, 1200);

    useEffect(() => {
        
        // const featuredImage = "65b38b62860840ca9c9b";
        fetchComments();
    }, [comment]);
    

    return (
    <>
        <div className='lg:w-8/12 md:w-11/12 w-[95%] m-auto px-2 py-4 md:px-6 md:py-8 bg-zinc-200 bg-opacity-70 rounded-lg dark:bg-[#030131]'>

            <div className='text-center text-black font-medium lg:text-3xl md:text-2xl text-xl dark:text-white'>
                <h2>Explore post at SnapThread</h2>
            </div>

            {
                (!loading && post) ? (
                <>
                    <div>
                        <div className='mt-5 w-full h-96 m-auto p-4 border-2 border-red-600 rounded-xl relative z-0'>
                            <img 
                                src={confService.filePreview(post.featuredImage)} 
                                alt={post.title} 
                                className='w-full h-full object-contain  rounded-xl'
                            />

                            {
                                isAuthor && (
                                    <div className='flex items-center gap-4 absolute bottom-2 right-3'>
                                        <Link to={`/edit-post/${post.$id}`}>
                                            <button className='bg-[#E60023] text-white rounded-xl px-3 py-1 md:px-4 md:py-2 hover:bg-[#c2001d]'>Edit</button>
                                        </  Link>

                                        <button  className='bg-[#E60023] text-white rounded-xl px-3 py-1 md:px-4 md:py-2 hover:bg-[#c2001d]' onClick={() => handleDeleteModal()}>Delete</button>
                                    </div>
                                )

                            }
                        </div>

                    </div>

                    {
                        showModal && (
                            <ShowModal 
                                title="Delete Post" 
                                body="Are you sure you want to delete this post?"
                                buttonText="Delete Post" 
                                onClose={() => setShowModal(false)}
                                onSubmitHandler={() => deletePost()}
                            />
                        )
                    }

                    <div className='mt-6 bg-white px-4 py-4 rounded-xl relative dark:bg-[#0e125d] dark:text-white'>
                        <h2 className='md:text-xl text-lg font-extrabold'>{post.title}</h2>
                        <span className='absolute -top-2 right-2 bg-[#E60023] text-white px-2 text-xs sm:text-sm md:text-[18px] tracking-wider rounded-full cursor-context-menu' title={`Status: ${post.status}`}>{post.status}</span>
                    </div>

                    <div className='mt-6 bg-white px-4 py-4 rounded-xl dark:bg-[#0e125d] dark:text-white'>
                        <h3 className='text-[14px] tracking-wider md:text-lg font-medium italic'>{post.content}</h3>
                    </div>

                    <div className='mt-6 bg-white px-4 py-4 rounded-xl select-none dark:bg-[#0e125d] tracking-wider dark:text-white'>

                        <div className='flex items-center my-2 gap-8 md:gap-14'>
                            {/* <FaRegHeart size={"25px"} /> */}
                            <span className='flex items-center gap-2 text-sm  md:text-md font-semibold'>

                                <span className='cursor-pointer' onClick={() => handleLike()}>
                                    {
                                        like ? (
                                        <>
                                            <FaHeart color={"#ff2626"} size={"25px"} /> 
                                        </>) : (
                                        <>
                                            <FaRegHeart color={"#ff2626"} size={"25px"} />
                                        </>
                                        )
                                    }
                                </span> {totalLikes + " Likes"}

                            </span>
                            <span className='flex items-center gap-2 text-sm md:text-md font-semibold'>
                                <span className='cursor-pointer' onClick={() => handleComment()}>

                                    {
                                        comment ? (
                                        <>
                                            <FaComment color={"#ff2626"} size={"23px"} />
                                        </>
                                        ) : (
                                        <>
                                            <FaRegComment color={"#ff2626"} size={"23px"} /> 
                                        </>
                                        )

                                    }

                                </span> {(totalComment.length === 0) ? "Comments" : totalComment.length + " Comments"}
                            </span>

                        </div>
                    </div>

                    {
                        (comment) ? (
                            <>
                            <div className='mt-6 bg-white px-2 py-2 md:px-4 md:py-4 rounded-xl dark:bg-[#0e125d] dark:text-white'>
                                <div className='h-[50vh] overflow-y-scroll'>

                                    {
                                        totalComment.map((commentItem) => (
                                        !(commentItem.userId === userId) ? (

                                            <div key={commentItem.$id}  className='w-full flex items-center justify-start'>
                                            
                                                <div className='bg-zinc-200 w-[88%] md:w-[60%] flex items-center  gap-4 text-lg px-2 py-1 md:px-6 md:py-1 mt-4 rounded-tr-2xl rounded-b-2xl dark:bg-gradient-to-br dark:from-[#d200c0] dark:to-[#f82852]'>
                                                <div className='flex items-center gap-2 md:gap-4'>
                                                    <FaUser size={"23px"} />
                                                    <div className='flex flex-col'>
                                                        <span className='text-xs md:text-sm font-semibold tracking-wider italic'>@{commentItem.userName}</span>
                                                        <span className='text-sm md:text-md'>
                                                            {commentItem.commentContent}
                                                        </span>
                                                    </div>
                                                </div>

                                                </div>
                                            </div>
                                        ) : (

                                            <div key={commentItem.$id} className='w-full flex items-center justify-end px-4'>

                                            <div className='bg-zinc-200 w-[88%] md:w-[60%] flex items-center  gap-4 text-lg px-2 py-1 md:px-6 md:py-1 mt-4 rounded-t-2xl rounded-bl-2xl dark:bg-gradient-to-br dark:from-[#d200c0] dark:to-[#f82852]'>
                                                <div className='flex items-center gap-2 md:gap-4'>
                                                    <FaUser size={"23px"} />
                                                    <div className='flex flex-col'>
                                                    <span className='text-xs md:text-sm font-semibold tracking-widest italic'>@{commentItem.userName}</span>
                                                        <span className='text-sm md:text-md'>
                                                            {commentItem.commentContent}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            </div>
                                        )
                                    ))
                                    }


                                
                                </div>

                                <div className='mt-4'>
                                    <form onSubmit={handleSubmit(createComment)} >
                                    <div className='flex items-center gap-4'>
                                    <input 
                                        type="text" 
                                        placeholder="Add a comment on post..." 
                                        className='w-full px-2 py-2 md:px-3 md:py-3 text-sm md:text-lg tracking-wider md:font-medium outline-none border-2 rounded-xl focus:border-blue-600 dark:bg-[#030131] dark:text-white'
                                        {...register("commentContent", {required: true})}
                                    />

                                    <button 
                                        type='submit'
                                        className='px-2 py-2 md:px-4 md:py-4 bg-[#eb2442] text-white rounded-xl hover:bg-[#ff082d]'
                                    ><FiSend size={"23px"} title='Post Comment...' /></button>
                                    </div>
                                    </form>
                                </div>
                            </div>
                            </>
                        ) : (null)
                    }
                </>
                ) : (
                    <div className='flex flex-col items-center justify-center w-full mt-8'>

                        <div className='w-20 h-20 border-2 border-[#df2121] rounded-full animate-spin border-t-transparent'></div>

                        <div className='flex items-center mt-10 bg-zinc-50 rounded-xl px-20 py-2'>
                            <Logo />
                        </div>

                    </div>
                )
            }

        </div>
    </>
    );
}

export default Post;