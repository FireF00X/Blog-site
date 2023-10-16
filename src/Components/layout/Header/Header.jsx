import React, { useContext } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logoImage from '../../../assets/images/logo.png'
import { AuthContext } from '../../../Contexts/AuthContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const Dlink = ({ end, path, children, title }) => {
    return (
        <Nav.Link as='span'>
            <NavLink end={!!end} to={path}>
                {children}{title}
            </NavLink>
        </Nav.Link>
    )
}


const Header = () => {
    const { isAuth, signout } = useContext(AuthContext);
    return (
        <header className={styles.header}>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as='span'>
                        <Dlink path={'/Blog-site/'}>
                            <img className={styles['logo-img']} src={logoImage} alt="logoImage" />
                        </Dlink>
                    </Navbar.Brand>

                    <Nav className="ms-auto">
                        <Dlink end title='Home' path='/Blog-site/' />
                        <Dlink end title='Blog' path='/Blog-site/blog' />
                        {isAuth ? (
                            <>
                                <Dlink title='Add New' path='/Blog-site/blog/addnew' />
                                <Button className='primary pt-1'
                                    size='sm'
                                    onClick={() => {

                                        MySwal.fire({
                                            title: 'Are you sure?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yes, logout'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                MySwal.fire(
                                                    'Loged Out!',
                                                    'Come Back Soon.',
                                                    'success'
                                                )
                                                signout();
                                            }
                                        })

                                    }}
                                >Log out</Button>
                            </>
                        ) : (
                            <Dlink title='Login' path='/Blog-site/login' />
                        )}

                    </Nav>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header