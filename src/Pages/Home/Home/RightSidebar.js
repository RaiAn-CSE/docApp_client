import React from 'react';
import { BiTrendingUp } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import trackDownLogo from '../../../assets/docAppImages/doctorImg1.png';

const RightSidebar = () => {
    return (
        <div className='basis-full lg:basis-1/4 self-start relative lg:sticky top-[76px] nm_Container'>
            <div className="p-4">
                <div className='flex justify-between items-center mb-4'>
                    <h3 className="text-base font-semibold text-gray-700">Health News</h3>
                    <BiTrendingUp color='#6B0DEC' size={30} />
                </div>

                <Link to='#' className="block text-xs font-semibold mt-2">New Advances in Cardiology</Link>
                <span className="text-xs">2d ago · 12,500 readers</span>

                <Link to='#' className="block text-xs font-semibold mt-2">Mental Health Awareness Month</Link>
                <span className="text-xs">3d ago · 8,500 readers</span>

                <Link to="#" className="block text-xs font-semibold mt-2">Rising Demand for Telehealth Services</Link>
                <span className="text-xs">1d ago · 15,000 readers</span>

                <Link to="#" className="block text-xs font-semibold mt-2">The Future of Family Medicine</Link>
                <span className="text-xs">5h ago · 10,934 readers</span>

                <Link to="#" className="block text-xs font-semibold mt-2">Healthcare Jobs on the Rise</Link>
                <span className="text-xs">6h ago · 7,100 readers</span> <br />

                <Link to='#' className="inline-block text-xs text-[#6B0DEC] border border-[#6B0DEC] rounded-full py-1 px-4 mt-3 font-medium hover:underline">
                    Read More
                </Link>
            </div>

            <div className="text-center p-4">
                <Link to='#' className="inline-block mx-2 my-1 text-sm">
                    About Us
                </Link>
                <Link to='#' className="inline-block mx-2 my-1 text-sm">
                    Terms of Service
                </Link>
                <Link to='#' className="inline-block mx-2 my-1 text-sm">
                    Privacy Policy
                </Link>
                <Link to='#' className="inline-block mx-2 my-1 text-sm">
                    Get the App
                </Link>
                <Link to='#' className="inline-block mx-2 my-1 text-sm">
                    More Resources
                </Link>

                <div className="flex items-center justify-center text-xs font-medium mt-4">
                    <img src={trackDownLogo} alt="logo" className="w-6 mr-1" />
                    <p>DocApp &#169; 2023. All rights reserved</p>
                </div>
            </div>
        </div>
    );
};

export default RightSidebar;
