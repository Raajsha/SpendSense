import { addBudget, updateBudget, deleteBudget, getBudget } from "../controllers/budgetControllers.js";
import { getBudgetWarnings } from "../controllers/warningControllers.js";
import express from 'express'

const router = express.Router()

router.post('/',addBudget)
router.put('/:id',updateBudget)
router.delete('/:id',deleteBudget)
router.get('/',getBudget)
router.get('/warnings',getBudgetWarnings)

export default router