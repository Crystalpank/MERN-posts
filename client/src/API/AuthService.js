import axios from "axios";

export default class AuthService {
    static async registration(form) {
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/auth/registration", {
            ...form
        })
        return response.data
    }

    static async login(form) {
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
            ...form
        })
        return response.data
    }

    static async auth(token) {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/auth/auth", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return response.data
    }
}