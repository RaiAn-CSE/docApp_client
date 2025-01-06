import React, { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useDoctor from '../../../hooks/useDoctor';


const Dashboard = () => {
    const { user, mongoUser } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isDoctor] = useDoctor(user?.email);

    console.log(user, "user");
    console.log(mongoUser, "mongoUser");

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="px-6 py-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome back, <span className="text-primary">{user ? user.displayName : mongoUser.name}!</span></h2>
                    <p className="text-gray-600 mt-2">Here’s what’s happening with your dashboard today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex items-center">
                            {mongoUser?.photoURL ? (
                                <img className='w-16 rounded-full -mt-9 p-[3px] border-2 border-white' src={mongoUser?.photoURL} alt="profile" />
                            ) : (
                                <FaUserCircle className='rounded-full -mt-4 p-[1px] border-2 border-secondary text-primary' size={50} />
                            )}
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold text-gray-800">{user ? user.displayName : mongoUser.name}</h3>
                                <p className="text-gray-600">{isAdmin ? "Admin" : isDoctor ? "Doctor" : "User"}</p>
                            </div>
                        </div>
                        <button className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-secondary">
                            View Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;