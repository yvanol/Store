import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AllUsers from "../components/Admin/AllUsers.jsx";
import AdminSidebar from '../components/Layout/AdminSideBar';

const AdminDashboardUsers = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={4} />
        </div>
        <AllUsers />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardUsers