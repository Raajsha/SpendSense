import { getUserProfile, updateProfile, deleteProfile } from "../controllers/userController.js";
import express from 'express'

const router = express.Router()

router.get('/:id',getUserProfile)
router.put('/:id',updateProfile)
router.delete('/:id', deleteProfile)

export default router