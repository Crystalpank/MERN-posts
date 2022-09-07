import React from 'react';
import { useContext, useState, useEffect, useCallback } from 'react';
import { Button } from 'react-materialize';
import PostService from '../API/PostService';
import { AuthContext } from '../App';
import AddPostForm from '../components/Form/AddPostForm';
import Modal from '../components/Modal/Modal';
import MyPostList from '../components/Post/MyPostList';
import { useFetching } from '../hooks/fetch.hook';

const Posts = () => {
    const { token, username } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [modal, setModal] = useState(false)
    const [postsFetching, isLoadingPosts, errorPosts] = useFetching(async () => {
        const response = await PostService.getPosts(token, username)
        setPosts(response)
    })

    useEffect(() => {
        postsFetching()
    }, [])

    const removePost = useCallback(async (id) => {
        setPosts(posts.filter(p => p._id !== id))
        const response = await PostService.removePost(token, id)
    })

    const createPost = useCallback((newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
        console.log(newPost)
    })

    return (
        <div className="container">
            <Button onClick={() => setModal(true)}>Добавить</Button>
            <Modal visible={modal} setVisible={setModal}>
                <AddPostForm create={createPost} />
            </Modal>

            <MyPostList posts={posts} remove={removePost} />
        </div>
    );
}

export default Posts;
