import React from 'react'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <>
    <AdminHeader/>
    <Outlet/>
    <AdminFooter/>
    </>
  )
}

export default AdminLayout