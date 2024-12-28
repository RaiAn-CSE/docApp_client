import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import DashboardPostCard from './DashboardPostCard';

const DoctorPosts = () => {
    const [posts, setPosts] = useState(null);
    const { user } = useContext(AuthContext);

    console.log(posts?.length);

    console.log(user?.email);

    useEffect(() => {
        (async () => {
            const res = await axios.get(`https://doc-app-server.vercel.app/emailPosts?email=${user?.email}`);

            setPosts(res.data);
        })();
    }, [user?.email]);

    console.log(posts);

    // delete item
    const handleDelete = (id) => {
        fetch(`https://doc-app-server.vercel.app/deleteItem/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Deleted successfully", {
                        duration: 4000,
                        position: 'top-center'
                    })
                    setPosts(posts.filter(post => post._id !== id));
                }
            })
            .catch(error => {
                toast.error("Error got to delete data")
            })
    }
    return (
        <div className="">
            <table className="table">

                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Description</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts && posts?.map((post, idx) => <DashboardPostCard key={idx} post={post} handleDelete={handleDelete}></DashboardPostCard>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default DoctorPosts;