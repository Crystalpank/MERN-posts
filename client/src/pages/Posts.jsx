import React from 'react';
import { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Button, Preloader } from 'react-materialize';
import PostService from '../API/PostService';
import UserService from '../API/UserService';
import { AuthContext } from '../App';
import AddPostForm from '../components/Form/AddPostForm';
import UpdateUserForm from '../components/Form/UpdateUserForm';
import Modal from '../components/Modal/Modal';
import MyPostList from '../components/Post/MyPostList';
import MyUserItem from '../components/User/MyUserItem';
import { useFetching } from '../hooks/fetch.hook';
import { usePosts } from '../hooks/posts.hook';
import { getPageCount } from '../utils/pages'
import { useObserver } from '../hooks/observer.hook'

const Posts = () => {
    const { token, username } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [limit, setLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [user, setUser] = useState([])
    const [postModal, setPostModal] = useState(false)
    const [userModal, setUserModal] = useState(false)
    const memoPosts = usePosts(posts)
    const lastElement = useRef()

    const [postsFetching, isLoadingPosts, errorPosts] = useFetching(async () => {
        const response = await PostService.getPostsLimit(token, username, page, limit)
        setPosts([...posts, ...response.posts])
        setTotalPages(getPageCount(response.count, limit))
    })

    const [userFetching, isLoadingUser, errorUser] = useFetching(async () => {
        const response = await UserService.getUser(token, username)
        setUser(response)
        console.log(response)
    })

    useObserver(lastElement, page < totalPages, isLoadingPosts, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        userFetching()
    }, [])

    useEffect(() => {
        postsFetching()
    }, [page, limit])

    const removePost = useCallback(async (id) => {
        setPosts(posts.filter(p => p._id !== id))
        const response = await PostService.removePost(token, id)
    })

    const createPost = useCallback((newPost) => {
        setPosts([newPost, ...posts])
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
        setPosts(prev => [...posts])
        const response = await PostService.updatePost(token, post)
        console.log(response)
    })

    return (
        <div className="container">
            <Button onClick={() => setPostModal(true)}>Добавить</Button>
            <Modal visible={userModal} setVisible={setUserModal}>
                <UpdateUserForm closeModal={() => setUserModal(false)} />
            </Modal>
            <Modal visible={postModal} setVisible={setPostModal}>
                <AddPostForm create={createPost} />
            </Modal>

            {
                isLoadingUser ?
                    <Preloader
                        active
                        color="blue"
                        flashing={false}
                        size="big"
                    /> :
                    <MyUserItem user={user} setUserModal={setUserModal} />
            }
            <MyPostList posts={memoPosts} remove={removePost} setLike={setLike} />
            <div ref={lastElement} style={{height:20}}></div>

        </div>
    );
}

export default Posts;
