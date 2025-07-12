import Transaction from '../models/Transaction.js'
export const addTxn = async(req,res) => {
    const {type, category, amount, date, note} = req.body

    if(!type || !category || !amount) {
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
            date
        })

        const savedTxn = await newTxn.save()
        res.status(200).json(savedTxn)
    } catch (error) {
        res.status(500).json({message: "Failed to add transaction"})
        console.log(error)
    }
}

export const updateTxn = async(req,res) => {
    const id = req.params.id
    const Txn = await Transaction.findById(id)

    if(!Txn) return res.status(404).json({message: "Transaction not found"})
    
    try {
        const updatedTxn = await Transaction.findByIdAndUpdate(id, {$set: req.body},{new: true})

        res.status(200).json(updatedTxn)
    } catch (error) {
        res.status(500).json({message: "Failed to update transaction"})
    }
}

export const deleteTxn = async(req,res) => {
    const id = req.params.id
    const Txn = await Transaction.findById(id)

    if(!Txn) return res.status(404).json({message: "Transaction not found"})

    try {
        await Transaction.findByIdAndDelete(id)
        res.status(200).json({message: "Transaction deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Failed to delete transaction"})
    }
}

export const getTxn = async(req,res) => {
    try {
        const {category, type, start ,end} = req.query;
        const query = {user: req.user.id}

        if(type) query.type
        if(category) query.category = category
        if(start || end) {
            query.date = {}
            if(start) query.date.$gte = new Date(start)
            if(end) query.date.$lte = new Date(end)
        }

        const txns = await Transaction.find(query).sort({date:-1}).select("-__v")

        res.status(200).json(txns)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch Transactions"})
        console.log(error)
    }
}
