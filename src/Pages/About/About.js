import React from 'react';
import docImage from "../../assets/docAppImages/doctorImg1.png";
import doctorLogo1 from "../../assets/docAppImages/doctorLogo1.jpeg";
import doctorLogo2 from "../../assets/docAppImages/doctorLogo2.jpg";
// import { CiPlay1 } from "react-icons/ci";
// import { IoIosSend } from "react-icons/io";
import Banner from '../Home/Banner/Banner';
import MakeAppointment from '../Home/MakeAppointment/MakeAppointment';
import InfoCards from '../Home/InfoCards/InfoCards';
import Services from '../Home/Services/Services';
import Testimonial from '../Home/Testimonial/Testimonial';

const About = () => {
    const categoryClass = "bg-[#F9F9F9] text-[#4444d8] py-2 px-4 rounded-full hover:text-white hover:bg-blue-900 transition duration-300 ease-in-out"

    const checkAvailability = [
        {
            "name": "Check In",
            "data": "Select Date"
        },
        {
            "name": "Check Out",
            "data": "Select Date"
        },
        {
            "name": "Specialty",
            "data": "Specialty"
        },
        {
            "name": "Doctor",
            "data": "Select Dr."
        },
        {
            "name": "Time",
            "data": "Pick a Time"
        },
    ]

    return (
        <>
            {/* First Section  */}
            <div className='hero min-h-screen bg-[#E2E2E2]'>
                <section className="hero-content relative grid grid-cols-12 gap-4 py-5 mx-2 lg:mx-0 p-5 lg:pr-8 lg:pl-16 2xl:px-4">

                    {/* Text Section */}
                    <div className="order-last lg:order-first col-span-12 lg:col-span-7 flex flex-col justify-center mb-[100px]">
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
                            Book Appointment with <br /> Expert Doctors...!
                        </h1>
                        <p className="text-sm leading-relaxed mt-[15px] text-[#353535] font-normal">
                            Connect with experienced doctors for face-to-face consultations at a time that suits you.
                            Schedule your appointment online and visit in person for personalized care.
                        </p>
                        <div className="mt-[25px] w-full lg:w-[80%] grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm urbanist">
                            <button className={categoryClass}>General</button>
                            <button className={categoryClass}>Pediatrics</button>
                            <button className={categoryClass}>Cardiology</button>
                            <button className={categoryClass}>Dental Care</button>
                        </div>
                        <div className="mt-[25px] mb-10 lg:w-[60%] h-9 flex items-center relative">
                            <button className="bg-[#4444d8] hover:bg-[#5f5ffa] transition duration-300 ease-in-out mr-4 px-4 py-2 rounded-full text-[12px] text-white">Discover Services</button>
                            <button className="flex items-center text-sm bg-[#F9F9F9] hover:text-white hover:bg-blue-900 transition duration-300 ease-in-out py-2 px-4 rounded-full">
                                <span className="flex items-center justify-center mr-2">
                                    {/* <CiPlay1 className='w-5 h-5' /> */}
                                    <i className="fa-solid fa-play absolute bg-transparent text-white"></i>
                                </span>
                                Watch our story
                            </button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="col-span-12 lg:col-span-5 relative pb-5">
                        <div className="px-8 py-5">
                            <img className="nm_Container rounded-lg w-full transition-transform duration-1000 transform hover:scale-105" src={docImage} alt="Doctor Consultation" />
                        </div>
                        <img className="absolute rounded-full top-1/2 right-0 transform -translate-y-1/2 h-24 w-24 border-[6px] border-gray-100 shadow-lg" src={doctorLogo1} alt="Doctor" />
                        <img className="absolute rounded-full top-0 left-0 h-24 w-24 border-[6px] border-gray-100 shadow-lg" src={doctorLogo2} alt="Doctor" />
                    </div>


                    {/* Title above the form */}
                    <p className="absolute bottom-[110px] lg:bottom-[160px] mx-1 sm:mx-5 lg:mx-0 lg:left-16 2xl:left-5 text-sm text-[#4A4A4A] font-semibold z-10">
                        Check Availability & Book Now
                    </p>
                    {/* Appointment Form Section */}
                    <div className="absolute w-auto lg:w-[70%] bottom-10 lg:bottom-[75px] mx-1 sm:mx-5 lg:mx-0 lg:left-16 2xl:left-5 bg-white nm_CheckBox rounded-full">
                        <div className="grid grid-cols-6 px-2 sm:px-5 lg:px-7 py-1 sm:py-2 lg:py-3 text-[10px] md:text-[12px] lg:text-[14px] space-x-1">
                            {
                                checkAvailability.map(data => (
                                    <div className="grid grid-cols-1">
                                        <p className="font-semibold">{data.name}</p>
                                        <p className="text-[#6B7280]">{data.data}</p>
                                    </div>
                                ))
                            }
                            <button className='flex justify-end items-center rounded-full'>
                                <span className='font-bold text-[18px] mr-1 text-blue-900 hover:text-blue-700'>Send</span>
                                {/* <IoIosSend className='w-7 h-7 text-blue-900 hover:text-blue-700' /> */}
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <div className='mx-10'>
                {/* Second Section  */}
                <Banner />
                <MakeAppointment />
                <InfoCards />
                <Services />
                <Testimonial />
            </div>
        </>
    );
};

export default About;
