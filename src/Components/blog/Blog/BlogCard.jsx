import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import styles from './Blogs.module.css'

const BlogCard = ({ title, excert, img, slug, user, createdAt }) => {

    const getDate = (d) => {
        const date = new Date(d);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }


    return (
        <Link to={`/Blog-site/blog/${slug}`} className={styles.card}>
            <Card style={{ width: '17rem' }}>
                <div className="photo">
                    <Card.Img variant="top" src={img} />
                    <div >
                        <small>By: {user}</small>
                        <small>{getDate(createdAt)}</small>
                    </div>
                </div>
                <Card.Body>
                    <Card.Title className={styles.titel}>{title}</Card.Title>
                    <Card.Text>
                        {excert}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default BlogCard