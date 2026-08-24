import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import menuRouter from './routes/menuRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/dishes', menuRouter)

export default app