import { addBudget, updateBudget, deleteBudget, getBudget, getBudgetById } from "../controllers/budgetControllers.js";
import { getBudgetWarnings } from "../controllers/warningControllers.js";
import express from 'express'

const router = express.Router()

router.get('/warnings',getBudgetWarnings)
router.post('/',addBudget)
router.put('/:id',updateBudget)
router.delete('/:id',deleteBudget)
router.get('/',getBudget)
router.get('/:id',getBudgetById)

export default router