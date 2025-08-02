import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";
import mongoose from 'mongoose'

export const getBudgetWarnings = async(req,res) => {
    try {
        const userId = req.user.id

        const budgets = await Budget.find({user: userId})

        if(budgets.length === 0) return res.status(404).json({message: "User has no budgets"})


        const now = new Date()
        const startofMonth = new Date(now.getFullYear(),now.getMonth(),1)
        const endofMonth = new Date(now.getFullYear(),now.getMonth() +1,0)
        const expenses = await Transaction.aggregate([
            {$match : {
                user: new mongoose.Types.ObjectId(userId),
                type: "expense",
                date: { $gte: startofMonth, $lte: endofMonth }
            }},
            {
                $group: {
                    _id: "$category",
                    totalSpent : {$sum : "$amount"}
                }
            }
        ]);

        const expenseMap = {};
        expenses.forEach((e) => {
            expenseMap[String(e._id).toLowerCase()] = e.totalSpent;
        });

        const budgetsWithStats= budgets.map((b) => {
            const categoryKey = String(b.category).toLowerCase()
            const spent = expenseMap[categoryKey] || 0;
            const warning = spent >= b.budget *0.8
            return {
                _id: b._id,
                user: b.user,
                category: b.category,
                budget : b.budget,
                createdAt: b.createdAt,
                updatedAt : b.updatedAt,
                spent,
                warning
            }
        })

        res.status(200).json(budgetsWithStats)

    } catch (error) {
        res.status(500).json({message: "Failed to get warnings"})
        console.log(error)
    }
}