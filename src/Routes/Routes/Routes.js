import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import About from "../../Pages/About/About";
import Conversations from '../../Pages/conversations/Conversations';
import ConversationPage from '../../Pages/conversations/ConversationPage';
import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard';
import DoctorPosts from '../../Pages/Dashboard/DoctorPosts/DoctorPosts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>
    },
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element: <PrivateRoute><Appointment /></PrivateRoute>
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: "/conversations/:postId",
                element: (
                    <PrivateRoute>
                        <Conversations />
                    </PrivateRoute>
                )
            },
            {
                path: "/conversations",
                element: (
                    <PrivateRoute>
                        <ConversationPage />
                    </PrivateRoute>
                )
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <DisplayError />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/myAppointment',
                element: <MyAppointment />
            },
            {
                path: '/dashboard/allUsers',
                element: <AllUsers />
            },
            {
                path: '/dashboard/addDoctor',
                element: <AddDoctor />
            },
            {
                path: '/dashboard/manageDoctors',
                element: <ManageDoctors />
            },
            {
                path: '/dashboard/doctorPosts',
                element: <DoctorPosts />
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://doc-app-server.vercel.app/bookings/${params.id}`)
            },
        ]
    }
])

export default router;