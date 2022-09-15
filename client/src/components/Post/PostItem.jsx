import React from 'react';
import { Card, Row, Col, Icon, CardTitle, Button } from 'react-materialize';
import { useContext, useState } from 'react';
import { AuthContext } from '../../App';

const PostItem = ({ post, setLike }) => {
    const { token, username } = useContext(AuthContext)
    const [localLike, setLocalLike] = useState(post.likes)
    const classList = ["cg_postItem-likes"]

    if (post.whoLikes.includes(username)) {
        classList.push("active")
    }
    const doLike = (e) => {
        if (e.target.parentElement.classList.contains("active")){
            setLocalLike(prev => prev - 1)
            e.target.parentElement.classList.remove("active")
        }else{
            setLocalLike(prev => prev + 1)
            e.target.parentElement.classList.add("active")
        }
        
        setLike(post)
    }

    return (
        <div className="post-item">
            <Col
                m={6}
                s={12}>
                <Card
                    closeIcon={<Icon>close</Icon>}
                    header={<CardTitle image={`/${post.image}`} reveal waves="light" />}
                    reveal={
                        <div className="cg_postItem-description">
                            {/* <p>Here is some more information about this product that is only revealed once clicked on.</p> */}
                            
                        </div>
                    }
                    revealIcon={<Icon>more_vert</Icon>}
                    title={post.title}>
                    <div className={classList.join(" ")} onClick={doLike}>

                        <Icon className="icon-like">favorite</Icon>

                        <span className="count-like">{localLike}</span>
                    </div>
                </Card>
            </Col>
        </div>
    );
}

export default PostItem;
