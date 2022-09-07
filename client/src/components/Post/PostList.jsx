import React from 'react';
import PostItem from './PostItem';
import { Row } from 'react-materialize'; 
const PostList = ({ posts }) => {
    return (
        <div className="posts-wrapper">
            <Row>
                {
                    posts.map((post, index) => <PostItem key={index} post={post} />).reverse()
                }
            </Row>
        </div>
    );
}

export default PostList;
