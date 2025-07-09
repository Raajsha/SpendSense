import Transaction from '../models/Transaction.js'
export const addTransaction = async(req,res) => {
    const {type, category, amount, note, date} = req.body

    if(!type || !category || !amount || !date) {
        return res.status(400).json({message: "All required fields must be provided"})
    }

    if(typeof amount !== 'number' || amount <= 0 ) return res.status(400).json({message: "Amount must be a positive number"})

    try {
        const newTxn = new Transaction({
            user: req.user.id,
            type,
            category,
            amount,
            note,
            date,
        })

        const savedTxn = await newTxn.save()
        res.status(200).json(savedTxn)
    } catch (error) {
        res.status(500).json({message: "Failed to add transaction"})
        console.log(error)
    }
}

export const updateTransaction = async(req,res) => {
    const id = req.params.id
    const Txn = Transaction.findById(id)

    if(!Txn) return res.status(404).json({message: "Transaction not found"})
    
    try {
        const updatedTxn = Transaction.findByIdAndUpdate(id, {$set: req.body},{new: true})

        res.status(200).json(updatedTxn)
    } catch (error) {
        res.status(500).json({message: "Failed to update transaction"})
    }
}

export const deleteTransaction = async(req,res) => {
    const id = req.params.id
    const Txn = Transaction.findById(id)

    if(!Txn) return res.status(404).json({message: "Transaction not found"})

    try {
        await Transaction.findByIdAndDelete(id)
        res.status(200).json({message: "Transaction deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Failed to delete transaction"})
    }
}