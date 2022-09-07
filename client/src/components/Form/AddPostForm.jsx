import React, { useContext, useState } from 'react';
import PostService from '../../API/PostService';
import { AuthContext } from '../../App';
import { useFetching } from '../../hooks/fetch.hook';
import {Button, TextInput, Icon} from "react-materialize"

const AddPostForm = ({create}) => {
    const {token, username} = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [selectedFile, setselectedFile] = useState(null)

    const [createPostFetching, isLoadingCreatePost , errorCreatePost] = useFetching(async() => {
        const newPost = await PostService.createPost({token, username, title, selectedFile})
        create(newPost)
        setTitle('')
        setselectedFile(null)
    })


const sendForm = (e) => {
    e.preventDefault()
    createPostFetching()
}

    return (
        <div>
            <h4>Добавить фото</h4>
            <form className="form form_addPost">

                <TextInput
                    className=""
                    label="Название"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <TextInput
                    label="Изображение"
                    type="file"
                    name="files" 
                    onChange={(e) => setselectedFile(e.target.files[0])}/>
                <Button
                    node="button"
                    type="submit"
                    waves="light"
                    onClick={sendForm}>
                    Отправить
                    <Icon right>
                        send
                    </Icon>
                </Button>
            </form>
        </div>
    );
}

export default AddPostForm;
