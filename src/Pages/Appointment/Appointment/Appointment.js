import React, { useContext, useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppointments from '../AvailableAppointments/AvailableAppointments';
import { AuthContext } from '../../../contexts/AuthProvider';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { user } = useContext(AuthContext);
    console.log("user is ok or not", user);

    return (
        <div className='min-h-screen'>
            {
                user && (
                    <div className='lg:flex min-h-screen'>
                        <div className='basis-[25%] lg:sticky lg:top-16 self-start'>
                            <AppointmentBanner
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                            />
                        </div>

                        <div className='basis-[75%]'>
                            <AvailableAppointments
                                selectedDate={selectedDate}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Appointment;