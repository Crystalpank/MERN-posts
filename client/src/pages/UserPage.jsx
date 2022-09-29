import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useContext, useState, useCallback, useRef } from 'react'
import { useFetching } from '../hooks/fetch.hook'
import PostService from "../API/PostService"
import UserService from "../API/UserService"
import { AuthContext } from '../App'
import PostList from '../components/Post/PostList'
import UserItem from '../components/User/UserItem'
import { getPageCount } from '../utils/pages'
import { useObserver } from '../hooks/observer.hook'

const UserPage = () => {
    const params = useParams()
    const { token, username } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [limit, setLimit] = useState(3)
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [user, setUser] = useState({})
    const lastElement = useRef()
    const location = useLocation()
    const userId = location.state?.user._id

    const [postsFetching, isLoadingPosts, errorPosts] = useFetching(async () => {
        const response = await PostService.getPostsLimit(token, userId, page, limit)
        setPosts([...posts, ...response.posts])
        setTotalPages(getPageCount(response.count, limit))
    })
    const [userFetching, isLoadingUser, errorUser] = useFetching(async () => {
        const response = await UserService.getUser(token, userId)
        setUser(response)
    })

    useObserver(lastElement, page < totalPages, isLoadingPosts, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        postsFetching()
    }, [page])

    useEffect(() => {
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
            <UserItem user={user} />
            <PostList posts={posts} setLike={setLike} />
            <div ref={lastElement} style={{ height: 20 }}></div>
        </div>
    );
}

export default UserPage;
