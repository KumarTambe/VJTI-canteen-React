import { getAllMessages, sendMessage } from "../controllers/messageControllers.js";
import { Authorization } from "../middleware/authMiddleware.js";
import express from 'express'

const router = express.Router()

router.post('/:dishId/sendMessage', Authorization, sendMessage)
router.get('/:dishId/getAllMessages', getAllMessages)

export default router