import express from 'express'
import cors from 'cors'
import router from './routes/authRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', router)
console.log('Auth routes mounted')

export default app