import React, { useContext, useState } from 'react';
import { AuthContext } from '../../App';
import UserService from '../../API/UserService';
import { Button, TextInput, Icon } from "react-materialize"
import { useFetching } from '../../hooks/fetch.hook';

const UpdateUserForm = () => {
    const { token, userId, username } = useContext(AuthContext)
    const [selectedFile, setselectedFile] = useState(null)
    const [newUsername, setNewUserName] = useState(username)

    const [updateUserFetching, isLoadingUpdateUser, errorUpdateUser] = useFetching(async () => {
        const newUserData = await UserService.updateUser({ token, newUsername, userId, selectedFile })

        setselectedFile(null)
        console.log(errorUpdateUser)
    })

    const sendForm = (e) => {
        e.preventDefault()
        if (!selectedFile) {
            return
        }
        updateUserFetching()
    }

    return (
        <div>
            <h4>Изменить данные</h4>
            <form className="form form_addPost">
                <TextInput
                    className=""
                    label="Никнейм"
                    value={newUsername}
                    onChange={(e) => setNewUserName(e.target.value)} />
                <TextInput
                    label="Аватар"
                    type="file"
                    name="files"
                    onChange={(e) => setselectedFile(e.target.files[0])} />
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

export default UpdateUserForm;
