import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import UserService from '../API/UserService';
import { AuthContext } from '../App';
import { useFetching } from '../hooks/fetch.hook';
import UserList from '../components/User/UserList';
import { useMemo } from 'react';

const Users = () => {
    const [users, setUsers] = useState([])
    const { token, username } = useContext(AuthContext)
    const userList = useMemo(() => {
        return users.filter(user => user.username !== username)
    }, [users, username])
    
    const [usersFetching, isLoadingUsers, errorUsers] = useFetching(async () => {
        const response = await UserService.getUserList(token)
        setUsers(response)
    })
    useEffect(() => {
        usersFetching()
    }, [])

    return (
        <div className="users-wrapper">
            <UserList users={userList} />
        </div>
    );
}

export default Users;
