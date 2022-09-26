import axios from "axios"

export default class PostService {

    // static async getPosts(token, username) {
    //     const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/posts', {
    //         params: { username },
    //         headers: {
    //             'Authorization': 'Bearer ' + token
    //         }
    //     })
    //     return response.data
    // }

    static async getPostsLimit(token, username, page, limit = 3) {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/posts', {
            params: { username, limit, page },
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return response.data
    }

    static async createPost(createData) {
        let formData = new FormData()
        formData.append("username", createData.username)
        formData.append("title", createData.title)
        formData.append("image", createData.selectedFile)
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/api/posts/create', formData, {
            headers: {
                'Authorization': 'Bearer ' + createData.token
            }
        })
        return response.data
    }

    static async removePost(token, id) {
        const response = await axios.delete(process.env.REACT_APP_SERVER_URL + `/api/posts/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        return response.data
    }

    static async updatePost(token, post) {
        const response = await axios.put(process.env.REACT_APP_SERVER_URL + `/api/posts/update/${post.id}`, { post },
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
        return response.data
    }

}