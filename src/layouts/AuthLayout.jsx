import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
    return (
        <>
        <main className='auth-class'>
            <Outlet />
        </main>
        </>
    )
}

export default AuthLayout