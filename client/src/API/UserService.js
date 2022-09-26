import axios from "axios";

export default class UserService {
    static async getUserList(token) {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/user", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return response.data
    }
    static async getUser(token, username) {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/api/user/${username}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return response.data
    }
    static async updateUser(updateData) {
        let formData = new FormData()
        formData.append("username", updateData.newUsername)
        formData.append("id", updateData.userId)
        formData.append("avatar", updateData.selectedFile)
        const response = await axios.put(process.env.REACT_APP_SERVER_URL + `/api/user/update`,  formData, {
            headers: {
                'Authorization': 'Bearer ' + updateData.token
            }
        })
        return response.data
    }
}