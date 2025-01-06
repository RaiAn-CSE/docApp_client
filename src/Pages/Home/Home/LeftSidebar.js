import React, { useContext } from 'react';
import { BsFillHouseCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import imgCover from "../../../assets/docAppImages/birdemHospitalLow.jpg";
import docLogo1 from "../../../assets/docAppImages/doctorLogo1.jpeg";
import docLogo2 from "../../../assets/docAppImages/doctorLogo2.jpg";
import { AuthContext } from '../../../contexts/AuthProvider';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineWorkspacePremium } from "react-icons/md";

const LeftSidebar = () => {
    const { user, mongoUser } = useContext(AuthContext);

    return (
        <div className='basis-full lg:basis-1/4 self-start lg:sticky top-0 lg:top-[76px] mb-5 lg:mb-0'>
            <div className='nm_Container'>
                <img src={imgCover} alt="cover" width="100%" />
                <div className='px-5'>
                    {mongoUser?.photoURL ? (
                        <img className='w-16 rounded-full -mt-9 p-[3px] border-2 border-white' src={mongoUser?.photoURL} alt="profile" />
                    ) : (
                        <FaUserCircle className='rounded-full -mt-4 p-[1px] border-2 border-secondary text-primary' size={50} />
                    )}
                    <h1 className='text-base font-semibold text-gray-700'>{user?.displayName}</h1>
                    <h3 className='text-sm font-medium text-gray-500 my-1'>Healthcare Provider</h3>
                    <div className="mt-5">
                        <ul className="list-none space-y-2">
                            <li className="w-full text-sm flex justify-between">
                                Profile views
                                <span className="text-primary">52</span>
                            </li>
                            <li className="w-full text-sm flex justify-between">
                                Recent post views
                                <span className="text-primary">810</span>
                            </li>
                            <li className="w-full text-sm flex justify-between">
                                Patient connections
                                <span className="text-primary mb-3">205</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center border border-gray-300">
                    <Link to='' className="flex items-center justify-center py-4 px-2 text-sm w-1/2">
                        <BsFillHouseCheckFill className='mr-2 text-primary' size={20} />
                        My item
                    </Link>
                    <Link to='' className="flex items-center justify-center py-4 px-2 border-l border-gray-300 text-sm w-1/2">
                        <MdOutlineWorkspacePremium className='mr-[3px] text-secondary' size={25} />
                        Try premium
                    </Link>
                </div>
            </div>

            <div className="nm_Container p-4 text-center text-xs mt-4">
                <small className="float-right font-medium">Ad &middot; &middot; &middot;</small>
                <p className="mt-2 mb-2">Master the principles of patient-centered care</p>
                <div className="flex justify-center">
                    <img src={docLogo1} alt="Healthcare Logo 1" className="w-20 rounded-full m-1" />
                    <img src={docLogo2} alt="Healthcare Logo 2" className="w-20 rounded-full m-1" />
                </div>
                <b className="block mt-2 font-medium">Leading Innovations in Healthcare</b>

                <Link to='#' className="inline-block text-primary border border-primary rounded-full py-1 px-4 mt-3 font-medium hover:underline">
                    Learn More
                </Link>
            </div>
        </div>
    );
};

export default LeftSidebar;
