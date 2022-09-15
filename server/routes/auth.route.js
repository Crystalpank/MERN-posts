const { Router } = require("express")
const router = Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const config = require("config")
const { check, validationResult } = require("express-validator")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/registration",
    [
        check('email', "Некорректно введена почта").isEmail(),
        check('password', 'Пароль должен быть диной не менее 4 символов и не более 12').isLength({ min: 4, max: 12 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const { username, email, password } = req.body
            const isUsed = await User.findOne({
                $or: [
                    {username: username}, 
                    {email: email}
                ]
            })
            if (isUsed) {
                return res.status(400).json({ message: "Пользователь с таким email или username уже есть" })
            }
            const hashPassword = await bcrypt.hash(password, 8)

            const user = new User({
                username,
                email,
                password: hashPassword,
                avatar: "avatar.png"
            })
            await user.save()
            const token = jwt.sign({ id: user.id }, config.get("secretKey"), {expiresIn: '1h'})
            res.json({
                message: "Пользователь создан",
                token,
                user: {
                    username: user.username,
                    id: user.id,
                    email: user.email,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Сервер ошибка" })
        }
    })

router.post("/login", async (req, res) => {
    try {

        const { identifier, password } = req.body
        const user = await User.findOne({
            $or: [
                {username: identifier}, 
                {email: identifier}
            ]
        })
        if (!user) {
            return res.status(400).json({ message: `Пользователь ${identifier} не найден` })
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({ message: "Неверный пароль" })
        }
        const token = jwt.sign({ id: user.id }, config.get("secretKey"), {expiresIn: '1h'})
        res.json({
            token,
            user: {
                username: user.username,
                id: user.id,
                email: user.email,
                avatar: user.avatar
            }
        })
    } catch (e) {
        console.log(e)
        res.send({ message: "Server error" })
    }
})

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

module.exports = router