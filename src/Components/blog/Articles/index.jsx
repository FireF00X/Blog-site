import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Make sure to import from 'react-router-dom'
import useFetchPostParam from '../../../hooks/useFetchPostParam';
import { Alert } from 'react-bootstrap'; // Import Alert from 'react-bootstrap'
import styles from './articles.module.css';
import { Card, Container, Row } from 'react-bootstrap';
import { FirebaseContext } from '../../../Contexts/FirebaseContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { PostsContext } from '../../../Contexts/PostsContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../../Contexts/AuthContext'

const MySwal = withReactContent(Swal)

const MainArticlesPage = () => {
    const getDate = (d) => {
        const date = new Date(d);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const param = useParams();
    const { getData, loading, error, data } = useFetchPostParam('Posts', param.slug);
    const { getData: getAllPosts } = useContext(PostsContext)
    const { db } = useContext(FirebaseContext);
    const { isAuth } = useContext(AuthContext)
    const isMount = useRef(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        const documentRef = doc(db, 'Posts', data.id);
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    deleteDoc(documentRef);
                    getAllPosts();
                    navigate('/Blog-site/blog');
                } catch (error) {
                    console.error('Error deleting document: ', error);
                }
                MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    };

    useEffect(() => {
        if (!isMount.current) {
            getData();
            isMount.current = true;
        }
    }, [getData]);

    return (
        <>
            {loading && <p className='text-center'>loading...</p>}
            {error && (
                <Alert
                    className={`text-center d-block my-auto`}
                    variant='danger'
                >
                    {error}
                </Alert>
            )}
            {data && !loading && !error && data !== null && (
                <article className={styles.article}>
                    <div className={styles.img}>
                        <img src={data.imgUrl} alt='article_image' /> {/* Fix the alt attribute */}
                    </div>
                    <Container>
                        {isAuth && <div className={styles['delete-button']} onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>}
                        <Row className='w-100 mb-4'>
                            <Card style={{ width: '100%' }}>
                                <Card.Body>
                                    <Card.Text className='d-flex justify-content-between'>
                                        <small>By : {data.user}</small>
                                        <small>created at: {getDate(data.createdAt)}</small>
                                    </Card.Text>
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Text>{data.excert}</Card.Text>
                                    <p dangerouslySetInnerHTML={{ __html: data.value }} />
                                </Card.Body>
                            </Card>
                        </Row>
                    </Container>
                </article>
            )}
        </>
    );
};

export default MainArticlesPage;
