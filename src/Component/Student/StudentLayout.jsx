import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentFooter from './StudentFooter'
import StudentHeader from './StudentHeader'

function StudentLayout() {
  return (
   <>
   <StudentHeader></StudentHeader>
   <Outlet></Outlet>
   <StudentFooter></StudentFooter>
   </>
  )
}

export default StudentLayout