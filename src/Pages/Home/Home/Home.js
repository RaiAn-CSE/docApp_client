import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { AuthContext } from './../../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import homeCSS from '../Home/Home.module.css';
import { BsCameraVideoFill, BsFillCameraFill, BsSendCheck } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { FaUserCircle } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import Lottie from 'lottie-react';
import loadingJson from "../../../assets/docAppLoading.json";
import PostCard from './PostCard';
import useAdmin from '../../../hooks/useAdmin';
import useDoctor from '../../../hooks/useDoctor';

const Home = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user, mongoUser } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isDoctor] = useDoctor(user?.email);
    const [image, setImage] = useState(null);
    const [postInfo, setPostInfo] = useState([]);
    const [isPosting, setIsPosting] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/posts`)
            .then(res => res.json())
            .then(data => setPostInfo(data));
    }, []);

    // Function to handle posting
    const handleItem = (data) => {
        setIsPosting(true);
        const img = data.image?.[0];
        const { description } = data;

        if (img) {
            // If an image is selected, upload the image first
            const uri = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`;
            const formData = new FormData();
            formData.append('image', img);

            fetch(uri, { method: 'POST', body: formData })
                .then(res => res.json())
                .then(imgData => {
                    if (imgData.status === 200) {
                        postContent(description, imgData.data.url);
                    } else {
                        handleError("Image upload failed");
                    }
                })
                .catch(() => handleError("Image upload failed"));
        } else {
            // If no image is selected, only post the description
            postContent(description, null);
        }
    };

    // Function to post content
    const postContent = (description, imageUrl) => {
        const currentTime = new Date().toISOString().replace('T', ' ').split('.')[0];
        const itemInfo = {
            description,
            image: imageUrl,
            userEmail: user.email,
            profileImg: user.photoURL,
            userName: user.displayName,
            postTime: currentTime,
        };

        fetch(`${process.env.REACT_APP_SERVER_LINK}/posts`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(itemInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Post added successfully", { duration: 4000, position: 'top-center' });

                    setPostInfo([itemInfo, ...postInfo]); // Add the new post to the postInfo state
                    reset(); // Clear the form input
                    setImage(null); // Reset the selected image
                    setIsPosting(false);
                } else {
                    handleError("Failed to add data");
                }
            })
            .catch(() => handleError("Failed to store the post info"));
    };

    // Function to handle errors
    const handleError = (message) => {
        toast.error(message, { duration: 4000, position: 'top-center' });
        setIsPosting(false);
    };

    return (
        <>
            <Navbar />
            <div className='w-full min-h-screen grid justify-center'>
                <div className='flex justify-between flex-wrap text-gray-700 py-3 px-[3%] lg:px-[6%] bg-[#E2E2E2] max-w-[1280px]'>


                    <LeftSidebar />

                    <div className='basis-full lg:basis-[47%]'>
                        {
                            (isDoctor || isAdmin) && (
                                <form className='p-2 nm_Container' onSubmit={handleSubmit(handleItem)}>
                                    <div className={homeCSS.createPostInput}>
                                        {mongoUser?.photoURL ? (
                                            <img
                                                className="w-[35px] rounded-full mr-[10px] border-2 p-1"
                                                src={mongoUser?.photoURL}
                                                alt="user"
                                            />
                                        ) : (
                                            <FaUserCircle className="w-[35px] rounded-full mr-[10px] border-2" color="#5F5FFA" size={30} />
                                        )}

                                        <textarea
                                            rows={image ? "5" : "2"}
                                            placeholder="Write a post details"
                                            className="bg-[#E2E2E2]"
                                            {...register("description")}
                                            required
                                        ></textarea>

                                        {image && (
                                            <div className="flex items-center ml-2 bg-[#E2E2E2]">
                                                <img src={image} className="w-36 lg:w-44 rounded-lg" alt="Selected" />
                                            </div>
                                        )}
                                    </div>
                                    <div className={`${homeCSS.createPostLinks}`}>
                                        <li>
                                            <label htmlFor="dropzone-file" className="flex items-center justify-center w-full h-full cursor-pointer hover:bg-gray-100"
                                                onChange={(event) => {
                                                    const file = event.target.files[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onload = () => setImage(reader.result);
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}>
                                                <BsFillCameraFill size={20} />
                                                <span className='ml-2'>Photo</span>
                                                <input id="dropzone-file" type="file" hidden {...register("image")} />
                                            </label>
                                        </li>
                                        <li>
                                            <label htmlFor="dropzone-file" className="flex items-center justify-center w-full h-full cursor-pointer hover:bg-gray-100">
                                                <BsCameraVideoFill size={20} />
                                                <span className='ml-2'>Video</span>
                                                <input id="dropzone-file" type="file" className="hidden" />
                                            </label>
                                        </li>
                                        <li className="flex items-center justify-center w-full h-full cursor-pointer hover:bg-gray-100"
                                            onClick={() => setImage(null)}>
                                            <AiFillDelete size={20} />
                                            <span className='ml-2'>Delete</span>
                                        </li>
                                        {isPosting ? (
                                            <div className='basis-[25%] flex justify-center items-center h-[40px]'>
                                                <Lottie animationData={loadingJson} loop={true} />
                                            </div>
                                        ) : (
                                            <button className='basis-[25%] flex justify-center items-center h-[40px] bg-gradient-to-r from-primary to-secondary text-white' type='submit'>
                                                <BsSendCheck size={20} />
                                            </button>
                                        )}
                                    </div>
                                </form>
                            )
                        }

                        {postInfo.map(data => <PostCard key={data._id} data={data} />)}
                    </div>

                    <RightSidebar />

                </div>
            </div>
        </>
    );
};

export default Home;
