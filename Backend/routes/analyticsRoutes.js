import express from 'express'
import { getTopDishes } from '../controllers/analyticsController.js'

const router = express.Router()

router.get('/top-dishes', getTopDishes)

export default router