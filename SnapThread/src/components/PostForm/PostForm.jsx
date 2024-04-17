import React, { useCallback, useEffect, useId, useState } from 'react';
import { MdCloudUpload } from "react-icons/md";
import { AiFillDelete, AiFillFileImage } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import confService from "../../services/confService.js";
import { useSelector } from 'react-redux';
import { Processing } from '../index.js';

function PostForm({ post }) {

    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No File Selected.");

    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue } = useForm({

        defaultValues: {

            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "",
        }
    });

    const statusOptions = [

        {value: 'active', text: 'Active'},
        {value: 'inactive', text: 'Inactive'},
    ];

    const [processing, setProcessing] = useState(false);

    const userId = useSelector((state) => (state.auth.userData?.$id));

    const submit = async (data) => {

        setProcessing(true);

        // check condition whether post has been received as 'props' if received then perform 'if block' operation otherwise 'else block'.

        if(post) {

            const file = await data.image[0] ? confService.uploadFile(data.image[0]) : null;

            if (file) {

                confService.deleteFile(post.featuredImage);
            }

            const dbPost = await confService.updatePost(post.$id, {

                ...data, featuredImage: file ? file.$id : undefined
            });

            if (dbPost) {

                setProcessing(false);
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else {

            const file = await confService.uploadFile(data.image[0]);

            if (file) {

                const fileId = file.$id;

                data.featuredImage = fileId;

                const dbPost = await confService.createPost({...data, userId: userId});

                if (dbPost) {

                    setProcessing(false);
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {

        if (value && typeof value === "string") {

            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }

            return "";
    }, []);

    useEffect(() => {
        
        const subscription = watch((value, { name }) => {

            if (name === "title") {

                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();

    }, [watch, slugTransform, setValue]);
    

    return (
    <>
    <div className='lg:w-8/12 md:w-11/12 w-[95%] m-auto md:px-6 md:py-8 px-2 py-4 bg-zinc-200 bg-opacity-70 rounded-lg dark:bg-[#15016e]'>

        <div className='text-center text-red-600 font-medium lg:text-4xl md:text-2xl text-xl dark:text-white'>
            {
                (!post) ? <h2>Create New Post</h2> : <h2>Edit Post</h2>
            }
        </div>

        <form onSubmit={handleSubmit(submit)}>

        <div className='bg-white flex flex-col md:flex md:flex-row max-w-[100%] items-center justify-between px-2 py-4 md:px-4 md:py-8 lg:px-12 lg:py-8 mt-8 rounded-xl border-2 border-red-600 dark:bg-[#030131]'>

                <div className='md:w-[48%] w-full'>
                    <div 
                        className='w-[100%] h-[30vh] flex flex-col items-center justify-center border-blue-600 border-2 border-dashed rounded-lg cursor-pointer'
                        title="Select Image File"

                        onClick={() => document.querySelector(".input-file").click()}
                        onChange={({ target: {files} }) => {
                            files[0] && setFileName(files[0].name)

                            if(files) {

                                setImage(URL.createObjectURL(files[0]));
                            }
                            
                        }}
                    >
                        <input 
                            type="file" 
                            className='input-file' 
                            hidden
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                            />

                        {
                            image ? (

                                <img 
                                    src={image} 
                                    className='w-[100%] h-[100%] p-2 object-contain rounded-lg' 
                                    alt={image.title} 
                                />
                            ) : (

                            <>
                                <MdCloudUpload color={"#E60023"} size={"70px"}/>

                                <h3 className='text-red-600 font-medium'>Browse File to Upload.</h3>
                            </>
                            )
                        }
                    </div>

                    <div className='w-full flex items-center justify-between mt-4 bg-zinc-100 rounded-lg md:p-3 p-1'>

                        <div className='flex items-center gap-2 md:text-lg text-sm'>
                            <AiFillFileImage color={"#E60023"} size={"22px"} />
                            <span className='font-medium lg:w-44 md:w-44 text-ellipsis overflow-hidden'>
                            {
                                fileName
                            }
                            </span>
                        </div>

                        <span className='hover:bg-zinc-300 p-2 rounded-lg cursor-pointer'
                            onClick={() => {

                                setImage(null)
                                setFileName("No File Selected.")
                            }}
                        >

                            <AiFillDelete color={"#E60023"} size={"22px"} title='Delete File' />
                        </span>
                    </div>

                    <div className='md:mt-6 mt-2'>
                        <input type="text" 
                            placeholder='Image title slug' 
                            className='w-full px-2 py-1 md:px-3 md:py-2 text-lg text-zinc-800 font-medium outline-none  border-2 border-zinc-400 rounded-lg' 
                            {...register("slug", {required: true})}
                            onInput={(e) => {

                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                    </div>
                </div>

                <div className='md:w-[48%] w-full mt-4 md:mt-0'>
                    <div>
                        <input type="text" 
                            placeholder='Add your title' 
                            className='w-full text-xl md:text-3xl text-zinc-800 font-medium outline-none px-2 py-1 border-b-2 border-b-zinc-400 rounded-lg' 
                            {...register("title", { required: true })}
                        />
                    </div>

                    <div className='mt-8 flex items-center gap-4 bg-zinc-100 rounded-xl p-2'>

                        <span className='px-4 py-2 bg-red-600 text-white text-lg md:text-2xl rounded-full'>H</span>

                        <div className='flex flex-col text-zinc-800 text-sm md:text-[16px] font-medium'>

                            <span className='mb-1'>Himanshi | Start a blog | Blogging Tips | Blog Traffic</span>

                            <span className='text-red-600'>200.24k Followers</span>
                        </div>
                    </div>

                    <div className='md:mt-8 mt-4'>
                        <input type="text" 
                            placeholder='Tell everyone what your Pin is about' 
                            className='w-full text-lg text-zinc-800 font-medium outline-none border-b-2 border-b-zinc-400 px-2 py-1 rounded-lg'
                            {...register("content", { required: true })}
                        />
                    </div>

                    <div className='md:mt-8 mt-4'>
                        <label htmlFor="status" className='inline-block text-sm md:text-lg mb-3 font-medium dark:text-white'>Select Status</label>
                        <select 
                            className='w-full px-3 py-2 text-lg text-zinc-800 font-medium outline-none  border-2 border-zinc-400 rounded-lg cursor-pointer' 
                            id='status'
                            // value={selectedOption}
                            // onChange={(e) => handleSelectOption(e)}
                            {...register("status", { required: true })}
                        >
                            {
                                statusOptions.map((option) => (

                                    <option key={option.value} value={option.value} >
                                        {option.text}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    
                    {
                        (processing) && (

                            <Processing />
                        )
                    }

                    <div className='mt-12'>
                        <button type='submit' className='w-full py-1 text-lg bg-red-600 text-white rounded-xl hover:bg-red-700'>
                            {
                                post ? "Update" : "Save & Publish"
                            }
                        </button>
                    </div>
                </div>

        </div>
        </form>

    </div>
    </>
    )
}

export default PostForm;