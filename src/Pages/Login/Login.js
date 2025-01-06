import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, loginInWithGoogle } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

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

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setLoginUserEmail(data.email);
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    };

    return (
        <div className='h-fit flex justify-center items-center my-5'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} // Toggle between text and password
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                                })}
                                className="input input-bordered w-full max-w-xs"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                className="absolute right-3 top-3 text-gray-600"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <label className="label"> <span className="label-text">Forget Password?</span></label>
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>

                    <input className='btn btn-accent w-full max-w-xs' value="Login" type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p className='mt-5'>
                    New here? <Link className="text-secondary" to="/signup">Create an Account</Link>
                </p>
                <div className="divider max-w-xs">OR</div>
                <button onClick={googleSignIn} className="btn btn-outline w-full max-w-xs">Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;
