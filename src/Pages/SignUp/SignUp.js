import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import { GoogleAuthProvider } from 'firebase/auth';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, loginInWithGoogle } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const from = location.state?.from?.pathname || '/';

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        loginInWithGoogle(googleProvider)
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSignUp = (data) => {
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully.');
                const userInfo = {
                    displayName: data.name
                };
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email);
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error);
                setSignUPError(error.message);
            });
    };

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch(`${process.env.REACT_APP_SERVER_LINK}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(() => {
                setCreatedUserEmail(email);
            });
    };

    return (
        <div className='h-fit flex justify-center items-center my-5'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register('name', {
                            required: 'Name is Required'
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register('email', {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be 6 characters long' },
                                    pattern: {
                                        value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                        message: 'Password must have uppercase, number and special characters'
                                    }
                                })}
                                className="input input-bordered w-full max-w-xs"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>

                    <input className='btn btn-accent w-full mt-4 max-w-xs' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>

                <p className="mt-5 ">
                    Already have an account? <Link className="text-secondary" to="/login">Login here</Link>
                </p>

                <div className="divider max-w-xs">OR</div>

                <button onClick={googleSignIn} className="btn btn-outline w-full max-w-xs">Continue with Google</button>
            </div>
        </div>
    );
};

export default SignUp;
