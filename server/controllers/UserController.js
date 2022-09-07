const User = require("../models/User")

class UserController {
    async getAll(req, res) {
        try {
            const users = await User.find()
            const safeUsers = users.map(user => {
                return {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
            return res.json(safeUsers)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getUserInfo(req, res) {
        try {
            const { username } = req.params
            const user = await User.findOne({ username })
            const safeUser = {
                _id: user.id,
                username: user.username,
                email: user.email
            }
            return res.json(safeUser)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateUser(req, res) {
        try {
            const { user } = req.body
            if (!user._id) {
                return res.status(400).json({ message: "Неверный ID" })
            }
            const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true })
            return res.json(updatedUser)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new UserController()