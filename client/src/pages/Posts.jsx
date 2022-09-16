import React from 'react';
import { useMemo } from 'react';
import { useContext, useState, useEffect, useCallback } from 'react';
import { Button } from 'react-materialize';
import PostService from '../API/PostService';
import UserService from '../API/UserService';
import { AuthContext } from '../App';
import AddPostForm from '../components/Form/AddPostForm';
import UpdateUserForm from '../components/Form/UpdateUserForm';
import Modal from '../components/Modal/Modal';
import MyPostList from '../components/Post/MyPostList';
import MyUserItem from '../components/User/MyUserItem';
import { useFetching } from '../hooks/fetch.hook';

const Posts = () => {
    const { token, username } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState([])
    const [postModal, setPostModal] = useState(false)
    const [userModal, setUserModal] = useState(false)
    const postsList = useMemo(() => {
        return posts
    }, [posts])
    const [postsFetching, isLoadingPosts, errorPosts] = useFetching(async () => {
        const response = await PostService.getPosts(token, username)
        setPosts(response.reverse())
    })

    const [userFetching, isLoadingUser, errorUser] = useFetching(async () => {
        const response = await UserService.getUser(token, username)
        setUser(response)
        console.log(response)
    })

    useEffect(() => {
        postsFetching()
        userFetching()
    }, [])

    const removePost = useCallback(async (id) => {
        setPosts(posts.filter(p => p._id !== id))
        const response = await PostService.removePost(token, id)
    })

    const createPost = useCallback((newPost) => {
        setPosts([...posts, newPost])
        setPostModal(false)
        console.log(newPost)
    })

    const setLike = useCallback(async (post) => {
        if (post.whoLikes.includes(username)) {
            post.whoLikes.splice(post.whoLikes.indexOf(username), 1)
            if (post.likes !== 0) post.likes--

        } else {
            post.whoLikes.push(username)
            post.likes++
        }
        let copy = Object.assign([], posts)
        setPosts(copy)
        const response = await PostService.updatePost(token, post)
        console.log(response)
    })

    return (
        <div className="container">
            <Button onClick={() => setPostModal(true)}>Добавить</Button>
            <Modal visible={userModal} setVisible={setUserModal}>
                <UpdateUserForm />
            </Modal>
            <Modal visible={postModal} setVisible={setPostModal}>
                <AddPostForm create={createPost} />
            </Modal>

            <MyUserItem user={user} setUserModal={setUserModal} />
            <MyPostList posts={postsList} remove={removePost} setLike={setLike} />
        </div>
    );
}

export default Posts;
