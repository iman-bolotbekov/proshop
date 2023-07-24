import React, { Suspense } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto min-h-[38rem]">
        <ToastContainer autoClose={3000} />
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default RootLayout
