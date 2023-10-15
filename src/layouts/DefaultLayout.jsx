import React from 'react'
import { Outlet } from 'react-router'
import Header from '../Components/layout/Header/Header'
import Footer from '../Components/layout/Footer/Footer'

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default DefaultLayout