import React from 'react';
import { Col, Collection, CollectionItem, Icon } from "react-materialize"

const MyUserItem = ({ user, setUserModal }) => {

    return (
        <Col
            m={6}
            s={12}
        >
            <Collection>
                <CollectionItem className="avatar">
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
                    <a
                        className="secondary-content"
                    >
                        <Icon onClick={() => setUserModal(true)}>
                            border_color
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

export default MyUserItem;
