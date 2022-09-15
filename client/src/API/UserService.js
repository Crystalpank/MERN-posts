import axios from "axios";

export default class UserService {
    static async getUserList(token) {
        const response = await axios.get("/api/user", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return response.data
    }
    static async getUser(token, username) {
        const response = await axios.get(`/api/user/${username}`, {
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
        const response = await axios.put(`/api/user/update`,  formData, {
            headers: {
                'Authorization': 'Bearer ' + updateData.token
            }
        })
        return response.data
    }
}