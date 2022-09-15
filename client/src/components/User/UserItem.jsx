import React from 'react';
import { Col, Collection, CollectionItem, Icon } from "react-materialize"
import { useNavigate, useParams } from 'react-router-dom';

const UserItem = ({ user }) => {
    let navigate = useNavigate()

    return (
        <Col
            m={6}
            s={12}
        >
            <Collection>
                <CollectionItem className="avatar">
                    <div onClick={() => navigate(`/users/${user.username}`)}>
                        <img
                            alt=""
                            className="circle"
                            src={user.avatar ? "/" + user.avatar : "/avatar.png"}
                        />
                        <span className="title">
                            {user.username}
                        </span>
                        <p>
                            {user.email}
                        </p>
                    </div>
                    <a
                        className="secondary-content"
                    >
                        <Icon>
                            grade
                        </Icon>
                    </a>
                </CollectionItem>
            </Collection>
        </Col>
        // <div className="user-item">
        //     <div className="user-item_username">{user.username}</div>
        //     <div className="user-item_email">{user.email}</div>
        // </div>
    );
}

export default UserItem;
