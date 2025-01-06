import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useDoctor from "../hooks/useDoctor";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isDoctor] = useDoctor(user?.email);
  return (
    <div>
      <Navbar></Navbar>

      <div className="drawer drawer-mobile h-fit">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>

        <div className="sticky top-0 h-screen">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content space-y-1">
            {
              // Only show "My Appointments" if the user is neither an admin nor a doctor
              <li>
                <Link to="/dashboard/myAppointment">My Appointments</Link>
              </li>
            }
            {
              // Only show doctor-specific link if the user is a doctor
              (isDoctor || isAdmin) && (
                <>
                  <li>
                    <Link to="/dashboard/doctorPosts">My Posts</Link>
                  </li>
                </>
              )
            }
            {
              // Only show admin-specific links if the user is an admin
              isAdmin && (
                <>
                  <li>
                    <Link to="/dashboard/allUsers">All Users</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addDoctor">Add A Doctor</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/manageDoctors">Manage Doctors</Link>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
