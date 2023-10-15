import React from 'react'
import { Container } from 'react-bootstrap'
import NotFoundImage from '../../../assets/images/not-found.png'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import styles from './NotFound.module.css'

const MainNotFoundPage = () => {
    const navigate = useNavigate()
    return (
        <section className='text-center p-4'>
            <Container>
                <img className={styles['not-found-img']} src={NotFoundImage} alt="not-found-img" />
                <p>This Page is Not Found</p>
                <Button variant='outline-secondary'
                size='lg'
                onclick={() => navigate('/Blog-site/')}>
                    Go Home
                </Button>
            </Container>
        </section>
    )
}

export default MainNotFoundPage