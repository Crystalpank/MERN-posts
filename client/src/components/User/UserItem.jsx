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
                    <div className="user_infoBlock" onClick={() => navigate(`/users/${user.username}`)}>
                        <img
                            alt=""
                            className="circle"
                            src={user.avatar ? "/" + user.avatar : "/avatar.png"}
                        />
                        <span className="user_title title">
                            {user.username}
                        </span>
                        <p className="user_description">
                            {user.email}
                        </p>
                    </div>
                    <div className="secondary-content user_moreBtn">
                        <Icon>
                            grade
                        </Icon>
                    </div>
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
