import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
    return (
        <>
        Authlayout
        <main>
            <Outlet />
        </main>
        </>
    )
}

export default AuthLayout