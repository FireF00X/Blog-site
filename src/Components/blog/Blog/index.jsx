import React, { useContext, useEffect, useRef } from 'react'
import { PostsContext } from '../../../Contexts/PostsContext'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import styles from './Blogs.module.css'
import BlogCard from './BlogCard';

const MainBlogPage = () => {

    const { fetch, data, loading, error, fetching, fetchNextPosts } = useContext(PostsContext);
    const isMount = useRef(false);
    const observePosts = useRef(null);

    useEffect(() => {
        if (!isMount.current) {

            fetch();
            isMount.current = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.observe(entry.target);
                    fetchNextPosts();
                };
            })
        }, {})

        if (observePosts.current) {
            observer.observe(observePosts.current)
        };
        return () => {
            if (observePosts.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(observePosts.current);
            }
        }
    }, [fetchNextPosts])


    return (
        <section className={styles.section}>
            <Container className=' d-flex flex-column justify-content-center '>
                <h1 className='py-3 text-center'>All Blogs</h1>
                {error && (
                    <Alert
                        className={`${styles.error} text-center d-block my-auto`}
                        variant={'danger'}
                    >
                        {error}
                    </Alert>
                )}
                {loading && (<div className='text-center'>
                    <Spinner animation="grow" />
                </div>)}
                {!loading && !error ? (
                    data && data.length === 0 ? (
                        <h2 className="text-center mt-5">No Data To Show...</h2>
                    ) : data ? (
                        <Row sm='1' md='2' lg='4' className='g-5 mb-4'>
                            {data.map((oneItem) => (
                                <Col key={oneItem.id}>
                                    <BlogCard
                                        img={oneItem.imgUrl}
                                        excert={oneItem.excert}
                                        title={oneItem.title}
                                        user={oneItem.user}
                                        slug={oneItem.slug}
                                        createdAt={oneItem.createdAt} />
                                </Col>
                            ))}
                        </Row>
                    ) : null
                ) : null}
                {fetching ? (<p className='text-center'>Loading...</p>) : null}
                <div className="ahmed" ref={observePosts}></div>
            </Container>
        </section>
    )
}

export default MainBlogPage