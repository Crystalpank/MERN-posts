const {Router} = require("express")
const router = Router()
const authMiddleware = require("../middleware/auth.middleware")
const UserController = require("../controllers/UserController")

router.get('/', authMiddleware, UserController.getAll)
router.get('/:id', authMiddleware, UserController.getUserInfo)
router.put('/update', authMiddleware, UserController.updateUser)

module.exports = router