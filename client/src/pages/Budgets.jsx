import { budgetAPI} from "../services/api.js";
import { useState, useEffect } from 'react';
import {ArrowUpCircle, ArrowDownCircle, DollarSign} from 'lucide-react'
import toast from "react-hot-toast";
import BudgetGrid from "../components/BudgetCard.jsx";
import { Link } from 'react-router-dom'

const Budgets = () => {
    const [budgets, setBudgets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBudgets()
    },[])

    const fetchBudgets = async() => {
        try {
            const response = await budgetAPI.getWarnings()
            setBudgets(response.data)
            console.log(response.data)
        } catch (error) {
            toast.error("Failed to fetch budgets")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    
    const totalBudget = budgets.reduce((sum,b) => sum + b.budget, 0)
    const totalSpending = budgets.reduce((sum,b) => sum + b.spent, 0)
    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center">
                <span className="bg-gradient-to-r from-white via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    Budgets
                </span>
            </h1>
            <p className='text-gray-400 text-lg text-center mt-2'>
                Set your own limits
            </p>
            <div className="flex items-center justify-evenly mt-4 mb-4 max-w-full">
                <div className="flex items-center justify-between gap-10 ">
                    <div className="bg-white p-4 rounded-xl hover:cursor-pointer hover:shadow-green-500 hover:shadow-lg hover:scale-105 transition-all duration-3000 ">
                        <div className="flex items-center justfiy-between">
                            <div>
                                <h2 className="text-xl font-bold text-blue mr-5">
                                    Total Budget
                                </h2>
                                <p className="text-2xl font-bold text-green-600">
                                    ${totalBudget.toFixed(2)}
                                </p>
                            </div>
                            <div className="bg-green-100 rounded-3xl p-4">
                                <ArrowUpCircle className='text-green-600' size={35} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl hover:cursor-pointer hover:shadow-red-500 hover:shadow-lg hover:scale-105 transition-all duration-3000 ">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-blue mr-5">
                                    Total Spending
                                </h2>
                                <p className="text-2xl font-bold text-red-600">
                                    ${totalSpending.toFixed(2)}
                                </p>
                            </div>
                            <div className="bg-red-100 rounded-3xl p-4">
                                <ArrowDownCircle className='text-red-600' size={35} />
                            </div>
                        </div>
                    </div>
                    <div className=" bg-white p-4 rounded-xl hover:cursor-pointer hover:shadow-blue-500 hover:shadow-lg hover:scale-105 transition-all duration-3000 ">
                        <div className="flex tiems-center justfiy-between">
                            <div>
                                <h2 className="text-xl font-bold text-blue mr-14">
                                    Balance
                                </h2>
                                <p className="text-2xl font-bold text-blue-600">
                                    {totalBudget >= totalSpending ? (`$${(totalBudget - totalSpending).toFixed(2)}`) : ("")}
                                </p>
                            </div>
                            <div className="bg-blue-200 rounded-3xl p-4">
                                <DollarSign className=' text-blue-600' size={35} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto mt-3 mb-3">
                <div className="flex items-center justify-between">
                    <input
                        type="text"
                        placeholder='Search transactions...'
                        className='w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <Link to ='/add-budget' className='text-lg p-3 rounded-full bg-gradient-to-r from-slate-500 to-blue-600 '>Add Budget</Link>
                </div>
            </div>
            <BudgetGrid budgets={budgets} setBudgets={setBudgets}/>
        </div>
    )
}

export default Budgets