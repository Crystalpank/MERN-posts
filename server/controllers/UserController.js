const User = require("../models/User")
const FileService = require("../services/FileService")

class UserController {
    async getAll(req, res) {
        try {
            const users = await User.find()
            const safeUsers = users.map(user => {
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    avatar: user.avatar
                }
            })
            return res.json(safeUsers)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getUserInfo(req, res) {
        try {
            const { id } = req.params
            const user = await User.findOne({ _id: id })
            const safeUser = {
                _id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
            return res.json(safeUser)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateUser(req, res) {
        try {
            const file = req.files.avatar
            const { username, id } = req.body
            
            if (!id) {
                return res.status(400).json({ message: "Неверный ID" })
            }
            const oldUser = await User.findOne({_id: id})
            const deletedFile = FileService.deleteFile(oldUser.avatar)

            const filename = FileService.saveFile(file)
            const user = {
                _id: id,
                username: username,
                avatar: filename
            }

            const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true })
            const safeUser = {
                _id: updatedUser._id,
                username: updatedUser.username,
                avatar: updatedUser.avatar,
                email: updatedUser.email
            }
            return res.json(safeUser)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new UserController()