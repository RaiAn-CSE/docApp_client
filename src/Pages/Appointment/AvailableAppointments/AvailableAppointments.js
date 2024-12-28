import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import loading from '../../../assets/docAppLoading.json';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';
import Lottie from 'lottie-react';

const AvailableAppointments = ({ selectedDate }) => {
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');

    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`https://doc-app-server.vercel.app/v2/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data
        }
    });

    if (isLoading) {
        return <div className='h-[500px] w-[500px] mx-auto'>
            <Lottie animationData={loading} loop={true} />
        </div>
    }

    return (
        <section className='my-10 mx-5'>
            <p className='text-center text-primary font-bold text-2xl'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;