import React from 'react';
import UserItem from './UserItem';
import { Row } from 'react-materialize';

const UserList = ({ users }) => {
    return (
        <div>
            <Row>
                {
                    users.map((user, index) => <UserItem key={index} user={user} />)
                }
            </Row>
        </div>
    );
}

export default UserList;
