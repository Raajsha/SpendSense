import express from 'express'
import { getTxn, addTxn,updateTxn,deleteTxn } from '../controllers/transactionController.js'

const router = express.Router()

router.get('/',getTxn)
router.post('/add',addTxn)
router.put('/:id',updateTxn)
router.delete('/:id',deleteTxn)

export default router
