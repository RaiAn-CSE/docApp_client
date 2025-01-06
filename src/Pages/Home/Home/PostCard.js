import React, { useContext } from 'react';
import { BiCommentDetail, BiLike } from 'react-icons/bi';
import { BsEmojiHeartEyes, BsSend } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { RiShareForwardLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const PostCard = (data) => {
    const { user, mongoUser } = useContext(AuthContext);
    const { _id, image, profileImg, userName, description, userEmail, postTime } = data.data;

    return (
        <div className={`mt-4 pt-5 px-5 rounded-md bg-[#E2E2E2] nm_Container`}>

            <div className='flex items-start mb-[20px]'>
                {
                    profileImg ?
                        <img className='w-[40px] rounded-full mr-[10px]' src={profileImg} alt="user" />
                        :
                        <FaUserCircle
                            className="w-[35px] rounded-full mr-[10px] border-2"
                            color="#5F5FFA"
                            size={30}
                        />
                }
                <div>
                    <h1 className='text-lg leading-none font-semibold text-black'>{userName}</h1>
                    <small className='text-xs block'>{userEmail}</small>
                    <small className='text-xs block'>{postTime}</small>
                </div>

                <button className="ml-5">
                    <Link to={`/conversations/${_id}`}>Message</Link>
                </button>
            </div>


            <p className='text-sm mb-[14px]'>{description}</p>
            {
                image &&
                <img className='mb-3' src={image} alt="Post img" width="100%" />
            }


            {/* Just for show off : */}
            <div className='flex justify-between items-center flex-wrap border-b border-gray-300 text-xs pb-[6px]'>
                <div className='flex items-center'>
                    <BiLike />
                    <BsEmojiHeartEyes />
                    <span className='block ml-1'>Abhinav Mishra and 75 others</span>
                </div>
                <div className='flex items-center'>
                    <span>22 comments &middot; 40 shares</span>
                </div>
            </div>


            {/* Just for show off : */}
            <div className='flex items-center justify-around py-[15px]'>
                <div className='flex items-center'>
                    <BiLike size={18} /><span className='text-sm ml-1'>Like</span>
                </div>
                <div className='flex items-center'>
                    <BiCommentDetail size={17} /><span className='text-sm ml-1'>Comment</span>
                </div>
                <div className='flex items-center'>
                    <RiShareForwardLine size={20} /><span className='text-sm ml-1'>Share</span>
                </div>
                <div className='flex items-center'>
                    <BsSend /><span className='text-sm ml-1'>Send</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;