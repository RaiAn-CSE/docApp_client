import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    console.log(user?.email, "user Email from my appointment");

    const url = `${process.env.REACT_APP_SERVER_LINK}/bookings?email=${user?.email}`;

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url); // Removed headers with authorization
            if (!res.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await res.json();
            return data;
        }
    });


    console.log(bookings, "bookings data");


    // Payment method :
    const handleFormSubmit = async (event, price) => {
        event.preventDefault();

        const paymentList = {
            price, // Add the passed booking price
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/order`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(paymentList),
            });

            if (!response.ok) {
                throw new Error("Failed to initiate payment");
            }

            const result = await response.json();

            if (result?.url) {
                // Redirect to SSLCommerz payment page
                window.location.replace(result.url);
            } else {
                console.error("Invalid payment URL", result);
                alert("Payment URL not found. Please try again.");
            }
        } catch (error) {
            console.error("Payment initiation error:", error);
            alert("Error initiating payment. Please check the console for details.");
        }
    };


    return (
        <div className='min-h-screen my-10 px-5'>
            <h3 className="text-2xl mb-5 font-bold">My Appointments - {bookings?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>
                                    {booking.price && !booking.paid && (
                                        <>
                                            <div className='flex'>
                                                <form
                                                    onSubmit={(event) => handleFormSubmit(event, booking.price)}
                                                >
                                                    <button type="submit" className="btn btn-primary btn-sm mr-2">
                                                        SSL
                                                    </button>
                                                </form>
                                                <Link to={`/dashboard/payment/${booking._id}`}>
                                                    <button className="btn btn-primary btn-sm">Card</button>
                                                </Link>
                                            </div>
                                        </>
                                    )}

                                    {
                                        booking.price && booking.paid && <span className='text-green-500'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default MyAppointment;