import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useState, useCallback } from 'react';
import { useFetching } from '../hooks/fetch.hook';
import PostService from "../API/PostService"
import UserService from "../API/UserService"
import { AuthContext } from '../App';
import PostList from '../components/Post/PostList';
import UserItem from '../components/User/UserItem';

const UserPage = () => {
    const params = useParams()
    const { token, username } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    const [postsFetching, isLoadingPosts, errorPosts] = useFetching(async () => {
        const response = await PostService.getPosts(token, params.username)
        setPosts(response)
    })
    const [userFetching, isLoadingUser, errorUser] = useFetching(async () => {
        const response = await UserService.getUser(token, params.username)
        setUser(response)
        console.log(response)
    })
    useEffect(() => {
        postsFetching()
        userFetching()
    }, [])

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
        <div>
            <UserItem user={user}/>
            <PostList posts={posts} setLike={setLike}/>
        </div>
    );
}

export default UserPage;
