import Budget from "../models/Budget.js";

export const addBudget = async(req,res) => {
    const {category, budget} = req.body 
    try {
        if(!category || typeof budget !== 'number' || budget<=0) {
            return res.status(400).json({message: "Bad request"})
        }
        const newBudget = new Budget({
            user: req.user.id,
            category,
            budget
        })

        const savedBudget = await newBudget.save()
        res.status(200).json(savedBudget)
    } catch (error) {
        res.status(500).json({message: "Failed to add budget"})
        console.log(error)
    }
}

export const updateBudget = async(req,res) => {
    const id = req.params.id
    try {
        const budget = await Budget.findById(id)
        if(!budget) return res.status(404).json({message: "Budget not found"})

        const updatedBudget = await Budget.findByIdAndUpdate(id,{$set: req.body})
        res.status(200).json(updatedBudget);
    } catch (error) {
        res.status(500).json({message: "Failed to update budget"})
    }
}

export const deleteBudget = async (req,res) => {
    const id = req.params.id
    const exists = await Budget.findById(id)
    
    if(!exists) return res.status(404),json({message: "Budget not found"})

    await Budget.findByIdAndDelete(id)
    res.status(200).json({message: "Budget deleted successfully"})
}

export const getBudget = async(req,res) => {
    const {category, budget} = req.query
    const query = {user: req.user.id}
    try {
        if(category) query.category = category
        if(budget) query.budget = budget

        const budgets = await Budget.find(query).sort({createdAt: -1})
        res.status(200).json(budgets)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch budgets"})
        console.log(error)
    }
}