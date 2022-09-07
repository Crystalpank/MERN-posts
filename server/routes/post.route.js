const {Router} = require("express")
const router = Router()
const authMiddleware = require("../middleware/auth.middleware")
const PostController = require("../controllers/PostController")

router.post('/create', authMiddleware, PostController.create)
router.get('/', authMiddleware, PostController.getMyPosts)
router.get('/:username', authMiddleware, PostController.getUserPosts)
router.delete('/delete/:id', authMiddleware, PostController.deletePost)
router.put('/update/:id', authMiddleware, PostController.updatePost)

module.exports = router