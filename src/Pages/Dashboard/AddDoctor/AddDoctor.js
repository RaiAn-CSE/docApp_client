import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import useToken from '../../../hooks/useToken';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { createUser, updateUser, signIn } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [specialties, setSpecialties] = useState([]);

    // const [token] = useToken(createdUserEmail);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (token) {
    //         navigate('/');
    //     }
    // }, [token, navigate]);

    // Fetch specialties for the dropdown
    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/appointmentSpecialty`);
                setSpecialties(res.data);
            } catch (err) { console.log(err); }
        };
        fetchSpecialties();
    }, []);

    // Handle form submission
    const handleSubmitData = async (data, event) => {
        event.preventDefault();

        try {
            // Upload image to imgbb
            const image = data.image[0];
            const formData = new FormData();
            formData.append('image', image);
            const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
                method: 'POST',
                body: formData,
            });
            const imgData = await imgRes.json();

            if (imgData.success) {
                const doctorData = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    photoURL: imgData.data.url,
                    role: 'doctor',
                };

                // Create user in Firebase
                await createUser(data?.email, data?.password);
                toast('User Created Successfully.');

                // Update Firebase display name
                await updateUser({
                    displayName: data?.name, photoURL: imgData?.data?.url
                });

                // Save user with role to database
                await UpdateDoctorUser(doctorData);
                await saveUser(doctorData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Save user data with role in the database
    const saveUser = async (doctor) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor),
        })
            .then(res => res.json())
            .then(data => {
                // setCreatedUserEmail(doctor?.email);
            })
        return response.json();
    };

    // Save user data with role in the database
    const UpdateDoctorUser = async (doctor) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_LINK}/v2/updateAppointmentOptions`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    specialty: doctor.specialty,
                    doctorName: doctor.name,
                    doctorPhoto: doctor.photoURL,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Appointment options updated successfully!');
            } else {
                toast.error(result.message || 'Failed to update appointment options.');
            }

            return result;
        } catch (error) {
            console.error('Error updating appointment options:', error);
            toast.error('An error occurred while updating appointment options.');
            throw error;
        }
    };

    return (
        <div className='w-96 my-10 px-5 min-h-screen'>
            <h2 className="text-2xl font-bold">Doctor Registration</h2>
            <form onSubmit={handleSubmit(handleSubmitData)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Name</span></label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is Required" })}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is Required" })}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Password</span></label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password must include uppercase, number, and special character" }
                        })}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Specialty</span></label>
                    <select {...register('specialty')} className="select input-bordered w-full max-w-xs">
                        {specialties.map(specialty => (
                            <option key={specialty._id} value={specialty.name}>{specialty.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label"><span className="label-text">Photo</span></label>
                    <input
                        type="file"
                        {...register("image", { required: "Photo is Required" })}
                        className="input input-bordered w-full max-w-xs px-4 py-2"
                    />
                    {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                </div>

                <input className='btn btn-accent w-full max-w-xs mt-4' value="Register as Doctor" type="submit" />
            </form>
        </div>
    );
};

export default AddDoctor;
