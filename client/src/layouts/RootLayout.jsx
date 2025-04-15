import React from 'react'
import { Navbar } from '../components/custom/Navbar'
import Footer from '../components/custom/Footer'

export const RootLayout = ({children}) => {
  return (
    <>
        <Navbar/>
        {children}
        <Footer/>
    </>
  )
}
