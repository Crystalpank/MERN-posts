import React from 'react';
import { useContext } from 'react';
import { Icon } from 'react-materialize';
import { AuthContext } from '../../App';

const PostItem = ({ post, setLike }) => {
    const { token, username } = useContext(AuthContext)
    const classList = ["cg_postItem-likes"]

    if (post.whoLikes.includes(username)) {
        classList.push("active")
    }

    return (
        <div className="col s12 m6">
            <div className="post-item">
                <div className="card">
                    <div className="card-image">
                        <img className="" src={`/${post.image}`} />
                    </div>

                    <div className="card-content">
                        <div>
                            <span className="card-title grey-text text-darken-4 m-0">{post.title}</span>
                        </div>
                        <p>{post._id}</p>
                        <div className={classList.join(" ")} onClick={() => setLike(post)}>
                            <Icon className="icon-like">favorite</Icon>
                            <span className="count-like">{post.likes}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PostItem;