import { getAllDishes, addDish } from "../controllers/menuControllers.js";
import { Authorization } from "../middleware/authMiddleware.js";
import express from 'express'

const router = express.Router()

router.post('/addDish', Authorization, addDish)
router.get('/getAllDishes', getAllDishes)

export default router