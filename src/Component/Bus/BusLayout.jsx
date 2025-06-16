import React from 'react'
import BusHeader from './BusHeader'
import { Outlet } from 'react-router-dom'

function BusLayout() {
  return (
    <>
    <BusHeader/>
    <Outlet/>
    </>
  )
}

export default BusLayout