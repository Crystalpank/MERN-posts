import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useFetching } from '../hooks/fetch.hook';
import PostService from "../API/PostService"
import UserService from "../API/UserService"
import { AuthContext } from '../App';
import PostList from '../components/Post/PostList';
import UserItem from '../components/User/UserItem';

const UserPage = () => {
    const { token } = useContext(AuthContext)
    const params = useParams()
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    const [postsFetching, isLoadingPosts, errorPosts] = useFetching(async () => {
        const response = await PostService.getPosts(token, params.username)
        setPosts(response)
    })
    const [userFetching, isLoadingUser, errorUser] = useFetching(async () => {
        const response = await UserService.getUser(token, params.username)
        setUser(response)
    })
    useEffect(() => {
        postsFetching()
        userFetching()
    }, [])

    return (
        <div>
            <UserItem user={user}/>
            <PostList posts={posts}/>
        </div>
    );
}

export default UserPage;
