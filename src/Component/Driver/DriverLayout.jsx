import React from 'react'
import DriverHeader from './DriverHeader'
import DriverFooter from './DriverFooter'
import { Outlet } from 'react-router-dom'

function DriverLayout() {
  return (
    <>
    
    <Outlet/>
    <DriverFooter/>
    </>
  )
}

export default DriverLayout