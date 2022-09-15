import React from 'react';
import MyPostItem from './MyPostItem';
import { Row } from 'react-materialize'; 

const MyPostList = ({ posts, remove, setLike }) => {
    return (
        <div className="posts-wrapper">
            <Row>
                {
                    posts.map((post, index) => <MyPostItem key={index} post={post} remove={remove} setLike={setLike}/>).reverse()
                }
            </Row>
        </div>
    );
}

export default MyPostList;