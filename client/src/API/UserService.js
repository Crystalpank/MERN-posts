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
}