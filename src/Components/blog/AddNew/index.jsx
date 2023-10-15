import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ReactQuillInput from './ReactQuillInput';
import { FirebaseContext } from '../../../Contexts/FirebaseContext';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { PostsContext } from '../../../Contexts/PostsContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const MainAddNewPage = () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const { db } = useContext(FirebaseContext);
    const { getData } = useContext(PostsContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value
        const excert = e.target.excert.value
        const imgUrl = e.target.image.value
        const slug = title.split(' ').join('-') + '-' + new Date().getTime();

        setLoading(true)

        try {
            const ColRef = collection(db, "Posts");
            await addDoc(ColRef, {
                title,
                excert,
                imgUrl,
                slug,
                value,
                user: 'Ahmed Elsayed',
                createdAt: serverTimestamp()
            })
            e.target.reset();
            setValue('');
            setLoading(false);
            getData();
            navigate('/Blog-site/blog/' + slug)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)

    }
    return (
        <section className='p-4 '>
            <Container>
                <Row>
                    <Col md='8' lg='6' className='mx-auto'>
                        <h2>Add new Article</h2>
                        <Form onSubmit={e => handleSubmit(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Post Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='title'
                                    placeholder="Enter Post Title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Post Excert</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='excert'
                                    placeholder="Enter Post Excert" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Post Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='image'
                                    placeholder="Enter Image Url" />
                            </Form.Group>

                            <ReactQuillInput value={value} setValue={setValue} />
                            <div className="d-grid mt-3" >
                                <Button type='submit'
                                    size='lg'
                                    variant='primary'
                                    onClick={() => {
                                        if (!loading) {
                                            MySwal.fire({
                                                position: 'top-end',
                                                icon: 'success',
                                                title: 'Your work has been saved',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        }
                                    }}
                                    disabled={loading}>
                                    Sumbit
                                    {loading ? '...' : ''}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default MainAddNewPage