import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { connectDB } from './config/DB.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5001

app.use(cors({
    origin: "http://localhost:5173",
    credentials : true
}))
app.use(express.json())

app.use('/auth',authRoutes);
app.use('/profile',userRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})
})