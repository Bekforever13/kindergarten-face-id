import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='w-full min-h-screen bg-slate-200'>
      <Outlet />
    </div>
  )
}

export default Layout
