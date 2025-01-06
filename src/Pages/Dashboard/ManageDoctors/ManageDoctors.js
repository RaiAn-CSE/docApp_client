import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null);
    }


    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_LINK}/doctors`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });


    const handleDeleteDoctor = doctor => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Doctor ${doctor.name} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="rounded-lg min-h-screen my-10 px-5">
            <h2 className="text-2xl mb-5 font-bold">Manage Doctors - {doctors?.length}</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left"></th>
                            <th className="py-3 px-6 text-left">Avatar</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Specialty</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {
                            doctors.map((doctor, i) => (
                                <tr key={doctor._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span>{i + 1}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <div className="flex items-center">
                                            <div className="avatar">
                                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                                    <img src={doctor.photoURL} alt={doctor.name} className="object-cover" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {doctor.name}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {doctor.email}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {doctor.specialty}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <label
                                            onClick={() => setDeletingDoctor(doctor)}
                                            htmlFor="confirmation-modal"
                                            className="btn btn-sm btn-error btn-outline"
                                        >
                                            Delete
                                        </label>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {deletingDoctor && (
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingDoctor.name}, this action cannot be undone.`}
                    successAction={handleDeleteDoctor}
                    successButtonName="Delete"
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default ManageDoctors;