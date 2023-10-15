import React from 'react'
import { Route, Routes } from 'react-router';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthLayout from '../layouts/AuthLayout';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import NotFound from '../pages/NotFound';
import AddNew from '../pages/blogs/AddNew';
import Article from '../pages/blogs/Artecle';
import Blogs from '../pages/blogs/Blogs';


const RoutesIndex = () => {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path={'*'} element={<NotFound />} />
                </Route>

                <Route path={'/blog'} element={<DefaultLayout />}>
                    <Route index element={<Blogs />} />
                    <Route path={'addnew'} element={<AddNew />} />
                    <Route path={':slug'} element={<Article />} />
                </Route>

                <Route path={'/'} element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path={'signup'} element={<SignUp />} />
                </Route>
            </Routes>

        </>
    )
}

export default RoutesIndex