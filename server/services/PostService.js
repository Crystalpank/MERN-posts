const Post = require("../models/Post")

class PostService {
    async create(post, image) {
        const createdPost = await Post.create(post)
        return createdPost
    }

    
}

module.exports = new PostService()