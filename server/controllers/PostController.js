const Post = require("../models/Post")
const FileService = require("../services/fileService")

class PostController {
    async create(req, res) {
        try {
            const file = req.files.image
            const { title, username } = req.body
            const filename = FileService.saveFile(file)
            const post = await Post.create({
                username,
                title,
                image: filename
            })

            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
            console.log(e)
        }
    }

    async getMyPosts(req, res) {

        try {
            const { username } = req.query
            const post = await Post.find({ username })
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getUserPosts(req, res) {

        try {
            const { username } = req.params
            const post = await Post.find({ username })
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deletePost(req, res) {
        try {
            const { id } = req.params
            const post = await Post.findByIdAndDelete(id)
            const deletedFile = FileService.deleteFile(post.image)
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updatePost(req, res) {
        try {
            const { post } = req.body
            if (!post._id) {
                return res.status(400).json({ message: "Неверный ID" })
            }
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true })
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    

}

module.exports = new PostController