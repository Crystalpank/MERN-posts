import React from 'react';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Card, Row, Col, Icon, CardTitle, Button } from 'react-materialize';
import { AuthContext } from '../../App';

const MyPostItem = ({ post, remove, setLike }) => {
    const { token, username } = useContext(AuthContext)
    // const [localLike, setLocalLike] = useState(post.likes)
    const classList = ["cg_postItem-likes"]

    if (post.whoLikes.includes(username)) {
        classList.push("active")
    }

    useEffect(() => {
        const drops = document.querySelectorAll('.dropdown-trigger');
        window.M.Dropdown.init(drops, {});
    }, [])

    return (
        <div className="col s12 m6">
            <div className="post-item">
                <div className="card">
                    <div className="card-image">
                        <img className="" src={`/${post.image}`} />
                    </div>
                    
                    <div className="card-content">
                        <div>
                            <span className="card-title grey-text text-darken-4 m-0">{post.title}
                                <div className='dropdown-trigger right' data-target={post._id}>
                                    <Icon>more_vert</Icon>
                                </div>
                            </span>
                                
                            <ul id={post._id} className='dropdown-content'>
                                <li><a onClick={() => remove(post._id)}>Удалить</a></li>
                            </ul>
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

export default MyPostItem;