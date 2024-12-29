import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER_LINK}/users`);
      const data = await res.json();
      return data;
    }
  });

  const handleMakeAdmin = id => {
    fetch(`${process.env.REACT_APP_SERVER_LINK}/users/admin/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Make admin successful.')
          refetch();
        }
      })
  }

  const handleMakeDoctor = id => {
    fetch(`${process.env.REACT_APP_SERVER_LINK}/users/doctor/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('Make admin successful.')
          refetch();
        }
      })
  }

  const handleDeleteUser = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_LINK}/users/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success('User deleted successfully.');
          refetch(); // Refresh the list of users
        } else {
          toast.error('Failed to delete user.');
        }
      })
      .catch(error => {
        toast.error('An error occurred while deleting the user.');
      });
  };

  return (
    <div className='min-h-screen my-10 px-5'>
      <h2 className="text-2xl mb-5 font-bold">All Users - {users?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Doctor</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, i) => <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td>{user?.role !== 'admin' && <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>

                <td>{user?.role !== 'doctor' && <button onClick={() => handleMakeDoctor(user._id)} className='btn btn-xs btn-primary'>Make Doctor</button>}</td>

                <td>
                  <button onClick={() => handleDeleteUser(user._id)} className='btn btn-xs btn-danger'>Delete</button>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;