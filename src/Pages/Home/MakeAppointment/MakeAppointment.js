import React from 'react';
import doctor from '../../../assets/docAppImages/doctorImg2.png';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section
            className="mt-20 bg-no-repeat bg-cover bg-center w-full grid items-center justify-center">

            <div className="container max-w-[1280px] rounded-lg"
                style={{ backgroundImage: `url(${appointment})` }}
            >
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <img
                        src={doctor}
                        className="-mt-32 hidden md:block lg:w-1/2"
                        alt="Doctor"
                    />
                    <div className="lg:w-1/2 flex flex-col justify-center text-white mr-[5%]">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Schedule Your Appointment Today
                        </h2>
                        <p className="text-base lg:text-lg mb-6">
                            Don’t wait to get the healthcare you deserve! Book an appointment with our expert doctors
                            and receive personalized face-to-face consultations. Your health is our priority.
                        </p>
                        <PrimaryButton>Book Appointment</PrimaryButton>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default MakeAppointment;
