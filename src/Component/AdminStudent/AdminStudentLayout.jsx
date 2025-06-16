import React from 'react'
import AdminStudentHeader from './AdminStudentHeader'
import { Outlet } from 'react-router-dom'

function AdminStudentLayout() {
  return (
    <>
    <AdminStudentHeader/>
    <Outlet/>
    </>
  )
}

export default AdminStudentLayout