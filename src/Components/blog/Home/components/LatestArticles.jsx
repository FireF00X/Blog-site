/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from 'react'
import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { PostsContext } from '../../../../Contexts/PostsContext'
import BlogCard from '../../Blog/BlogCard';
import { useNavigate } from 'react-router';

const LatestArticles = () => {

  const { fetch, data, loading, error } = useContext(PostsContext);
  const isMount = useRef(false);
  const navigate = useNavigate()
  useEffect(() => {
    if (!isMount.current) {

      fetch();

      isMount.current = true
    }
  }, [])
  return (
    <section className='p-3'>
      <Container>
        <h3 className='text-center mb-5'>Latest Articles</h3>
        {error && (
          <Alert
            className={`text-center d-block my-auto`}
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
            <Row xm='1' md='2' lg='4' className=' '>
              {data.slice(0, 4).map((oneItem) => (
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
              <Button
                variant={'primary'}
                className='my-5 mx-auto'
                onClick={() => { navigate('/blog') }}>
                See All
              </Button>
            </Row>
          ) : null
        ) : null}

      </Container>
    </section>
  )
}

export default LatestArticles