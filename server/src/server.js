import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectDB } from './config/DB.js'
import rateLimiter from './middleware/rateLimiter.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import budgetRoutes from './routes/budgetRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'
import adminMiddleware from './middleware/adminMiddleware.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

app.use(cors({
    origin: "http://localhost:5173",
    credentials : true
}))
app.use(express.json())
app.use(rateLimiter)

app.use('/auth',authRoutes);
app.use('/profile',authMiddleware,userRoutes);
app.use('/transaction',authMiddleware,transactionRoutes);
app.use('/budgets',authMiddleware,budgetRoutes);
app.use('/admin',authMiddleware,adminMiddleware,adminRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    })
})