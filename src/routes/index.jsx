import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthLayout from '../layouts/AuthLayout';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import NotFound from '../pages/NotFound';
import AddNew from '../pages/blogs/AddNew';
import Article from '../pages/blogs/Artecle';
import Blogs from '../pages/blogs/Blogs';
import { AuthContext } from '../Contexts/AuthContext';


const RoutesIndex = () => {
    const { isAuth } = useContext(AuthContext);
    return (
        <>
            <Routes>
                <Route path={'/Blog-site/'} element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path={'*'} element={<NotFound />} />
                </Route>

                <Route path={'/Blog-site/blog'} element={<DefaultLayout />}>
                    <Route index element={<Blogs />} />
                    {isAuth?(
                    <Route path={'addnew'} element={<AddNew />} />
                    ):(
                    <Route path={'addnew'} element={<Navigate to={'/Blog-site/login'} />} />

                    )}
                    <Route path={':slug'} element={<Article />} />
                </Route>

                <Route path={'/Blog-site/'} element={<AuthLayout />}>
                    {!isAuth ? (
                        <>
                            <Route path='login' element={<Login />} />
                            <Route path={'signup'} element={<SignUp />} />
                        </>
                    ) : (
                        <>
                            <Route path='login' element={<Navigate to={'/Blog-site/'} />} />
                            <Route path={'signup'} element={<Navigate to={'/Blog-site/'} />} />
                        </>
                    )}
                </Route>
            </Routes>

        </>
    )
}

export default RoutesIndex