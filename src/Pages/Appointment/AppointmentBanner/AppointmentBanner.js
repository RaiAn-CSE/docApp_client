import React from 'react';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <header className='px-5 py-16'>
            <div className="hero">
                <div className='sm:w-full'>
                    <DayPicker
                        mode='single'
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                    />
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;