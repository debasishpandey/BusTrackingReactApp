import React from 'react'
import AdminDriverHeader from './AdminDriverHeader'
import { Outlet } from 'react-router-dom'

function AdminDriverLayout() {
  return (
    <>
    <AdminDriverHeader/>
    <Outlet/>
    </>
  )
}

export default AdminDriverLayout