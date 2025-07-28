import Budget from "../models/Budget.js";

export const addBudget = async(req,res) => {
    const {category, budget, note} = req.body 
    try {
        if(!category) {
            return res.status(400).json({message: "Bad request"})
        }
        const numBudget = Number(budget)
        if(isNaN(numBudget) || numBudget<= 0) {
            return res.status(400).json({message: "Enter valid input for amount"})
        }
        const newBudget = new Budget({
            user: req.user.id,
            category: String(category).toLowerCase(),
            budget : numBudget,
            note
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
    
    if(!exists) return res.status(404).json({message: "Budget not found"})

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

export const getBudgetById = async(req,res) => {
    const id = req.params.id
    try {
        const budget = await Budget.findById(id)
        if(!budget) res.status(404).json({message: "Budget not found"})

        res.status(200).json(budget)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch budget"})
        console.log(error)
    }
}