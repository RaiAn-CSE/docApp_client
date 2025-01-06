import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    const menuItems = <React.Fragment>
        <li className='lg:px-1'><Link to="/">Home</Link></li>
        <li className='lg:px-1'><Link to="/appointment">Appointment</Link></li>
        <li className='lg:px-1'><Link to="/about">About</Link></li>
        <li className='lg:px-1'><Link to="/conversations">Conversation</Link></li>
        {
            user?.uid ?
                <>
                    <li className='lg:px-1'><Link to="/dashboard">Dashboard</Link></li>
                    <li className='lg:px-1'><button onClick={handleLogOut}>Sign out</button></li>
                </>
                :
                <>
                    <li className='lg:px-1'><Link to="/login">Login</Link></li>
                    <li className='lg:px-1'><Link to="/signup">SignUp</Link></li>
                </>
        }
    </React.Fragment>

    return (
        <div className="navbar flex justify-between sticky top-0 z-50 backdrop-blur-md shadow-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">Public-Healthcare</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;