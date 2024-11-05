import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');

    // Fetch specialties for the dropdown
    const { data: specialties = [], isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/appointmentSpecialty');
            return res.json();
        }
    });

    // Handle form submission
    const handleLogin = async (data, event) => {
        event.preventDefault();
        // setSignUpError(''); // Reset error message

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
                const userRes = await createUser(data.email, data.password);
                const user = userRes.user;
                toast('User Created Successfully.');

                // Update Firebase display name
                await updateUser({ displayName: data.name });

                // Save user with role to database
                await saveUser(doctorData);
            }
        } catch (error) {
            console.error(error);
            // setSignUpError(error.message);
        }
    };

    // Save user data with role in the database
    const saveUser = async (doctor) => {
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctor),
        });
        return response.json();
    };

    if (isLoading) {
        return <div>Loading...</div>; // Or any loading component
    }

    return (
        <div className='w-96 p-7 min-h-screen'>
            <h2 className="text-4xl">Doctor Registration</h2>
            <form onSubmit={handleSubmit(handleLogin)}>
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
                        className="input input-bordered w-full max-w-xs"
                    />
                    {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                </div>
                <input className='btn btn-accent w-full mt-4' value="Register as Doctor" type="submit" />
                {/* {signUpError && <p className='text-red-600'>{signUpError}</p>} */}
            </form>
        </div>
    );
};

export default AddDoctor;
