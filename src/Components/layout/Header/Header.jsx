import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logoImage from '../../../assets/images/logo.png'

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
                        <Dlink title='Add New' path='/Blog-site/blog/addnew' />
                        <Dlink title='Login' path='/Blog-site/login' />
                    </Nav>
                </Container>
            </Navbar>
        </header >
    )
}

export default Header