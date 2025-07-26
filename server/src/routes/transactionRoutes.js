import express from 'express'
import { getTxn, addTxn,updateTxn,deleteTxn, getTxnById } from '../controllers/transactionController.js'

const router = express.Router()

router.get('/',getTxn)
router.get('/:id',getTxnById)
router.post('/add',addTxn)
router.put('/:id',updateTxn)
router.delete('/:id',deleteTxn)

export default router
