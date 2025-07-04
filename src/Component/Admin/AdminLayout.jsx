import React from 'react'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <>
    <AdminHeader className="sticky top-0 z-[999] bg-gray-900 text-white shadow"/>
    <Outlet/>
    <AdminFooter/>
    </>
  )
}

export default AdminLayout