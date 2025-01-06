import React from 'react';

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
    const { name, price, slots, doctorName, doctorPhoto } = appointmentOption;

    return (
        <div className="card nm_Container h-fit">
            <div className="card-body text-center">
                {
                    doctorName && (
                        <div className="flex flex-col items-center justify-center">
                            <img className="h-16 w-16 rounded-full" src={doctorPhoto} alt="Doctor" />
                            <p className="mt-2">Dr. {doctorName}</p>
                        </div>
                    )
                }
                <h2 className="text-xl text-secondary font-bold text-center">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try Another day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <p><small>Price: ${price}</small></p>
                <div className="card-actions justify-center">
                    <label
                        disabled={slots.length === 0}
                        htmlFor="booking-modal"
                        className="btn btn-primary border-none bg-gradient-to-r from-primary to-secondary text-white"
                        onClick={() => setTreatment(appointmentOption)}
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;