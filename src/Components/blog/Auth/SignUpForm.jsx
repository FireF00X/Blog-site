import React, { useContext } from 'react';
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../../Contexts/AuthContext';

const SignUpForm = () => {
    const navigate = useNavigate();

    const { signup, isAuth } = useContext(AuthContext)


    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmpassword: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6, 'Password Must be More than 5 char.').required(),
            confirmpassword: Yup.string().required().oneOf([Yup.ref('password')], 'must be matched')
        }),
        onSubmit: async (values) => {
            formik.resetForm();
            try {
                if (formik.isValid) {
                    await signup(values.email, values.password)
                    navigate('/Blog-site/')
                }
            } catch (error) {
                alert("This Email is exist")
            }

        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit();
        if (formik.isValid && isAuth) navigate('/Blog-site')
    }

    return (
        <div className={styles['login-wrap']}>
            <h2>Sign Up</h2>
            <form
                className={styles.form}
                onSubmit={handleSubmit}>

                {/* user name */}
                <input type="text"
                    placeholder="Username"
                    name="username"
                    className={formik.errors.username &&
                        formik.touched.username ?
                        styles.error : ''}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                {formik.errors.username && formik.touched.username &&
                    <p className={`${styles.error} text-center`}>{formik.errors.username}</p>}


                {/* email */}
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


                {/* password */}
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


                {/* confirm Password */}
                <input type="password"
                    placeholder="Confirm Password"
                    name="confirmpassword"
                    className={formik.errors.confirmpassword &&
                        formik.touched.confirmpassword ?
                        styles.error : ''}
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />

                {formik.errors.confirmpassword &&
                    formik.touched.confirmpassword &&
                    <p className={`${styles.error} text-center`}>{formik.errors.confirmpassword}</p>}

                <button disabled={!formik.isValid}> Sign Up </button>
                <Link to='/Blog-site/login'> <p> I already have an account</p></Link>
            </form>
        </div>
    )
}

export default SignUpForm