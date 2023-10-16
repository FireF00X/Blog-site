import React, { useContext } from 'react'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../../Contexts/AuthContext';


const LoginForm = () => {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6, 'Password Must be More than 5 char.').required(),

        }),
        onSubmit: async (values) => {
            formik.resetForm();
            try {
                if (formik.isValid) {
                    await login(values.email, values.password);
                    navigate('/Blog-site/')
                }
            } catch (error) {
                alert("Please Enter A valid Email & Password")
            }
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit();
    }


    return (
        <>
            <div
                className={styles['login-wrap']}
                onSubmit={handleSubmit}>
                <h2>Login</h2>

                <form className={styles.form}>
                    <input type="text"
                        placeholder="Email"
                        name="email"
                        className={formik.errors.email &&
                            formik.touched.email ?
                            styles.error : ''}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    {formik.errors.email && formik.touched.email &&
                        <p className={`${styles.error} text-center`}>{formik.errors.email}</p>}

                    <input type="password"
                        placeholder="Password"
                        name="password"
                        className={formik.errors.password &&
                            formik.touched.password ?
                            styles.error : ''}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    {formik.errors.password &&
                        formik.touched.password &&
                        <p className={`${styles.error} text-center`}>{formik.errors.password}</p>}

                    <button disabled={!formik.isValid}> Sign in </button>
                    <Link to='/Blog-site/signup'> <p> Don't have an account? Register </p></Link>
                </form>
            </div>
        </>
    )
}

export default LoginForm