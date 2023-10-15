import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import heroImage from '../../../../assets/images/logo.png';
import styles from './Home.module.css'
import { useNavigate } from 'react-router';


const Hero = () => {
    const navigate = useNavigate()
    return (
        <section className='bg-light p-4'>
            <Container>
                <Row className='justify-content-center '>
                    <Col className='d-flex justify-content-center align-items-center flex-column' sm='12' md='10' lg='8'>
                        <div className={`${styles['hero-image']}`}>
                            <img src={heroImage} alt="heroImage" />
                        </div>
                        <p className='mt-3 text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem similique beatae earum natus tenetur quisquam itaque accusantium, voluptas iusto, deserunt, ad vel repellendus reiciendis incidunt?</p>
                        <Button variant='primary'
                            className='' onClick={_ => navigate('/blog/addnew')}>
                            Add New Article
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Hero