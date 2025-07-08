import { getUserProfile, updateProfile } from "../controllers/userController.js";
import express from 'express'

const router = express.Router()

router.get('/:id',getUserProfile)
router.put('/:id',updateProfile)

export default router