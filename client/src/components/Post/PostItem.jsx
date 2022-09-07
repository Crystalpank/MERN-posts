import React from 'react';
import { Card, Row, Col, Icon, CardTitle, Button } from 'react-materialize';

const PostItem = ({ post }) => {
    return (
        <div className="post-item">
            <Col
                m={6}
                s={12}>
                <Card
                    closeIcon={<Icon>close</Icon>}
                    header={<CardTitle image={`http://192.168.0.118:5000/${post.image}`} reveal waves="light" />}
                    reveal={
                        <div>
                            <p>Here is some more information about this product that is only revealed once clicked on.</p>
                        </div>
                    }
                    revealIcon={<Icon>more_vert</Icon>}
                    title={post.title}>
                    <p>
                        <a href="#">
                            This is a link
                        </a>
                    </p>
                </Card>
            </Col>
        </div>
    );
}

export default PostItem;
