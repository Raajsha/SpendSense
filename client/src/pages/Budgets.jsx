import { budgetAPI} from "../services/api.js";
import { useState, useEffect } from 'react';

const Budgets = () => {
    const [budgets, setBudgets] = useState([])
    const [loading, setLoading] = useState(true)
    const [warnings, setWarnings] = useState([])

    useEffect(() => {
        fetchBudgets()
    },[])

    const fetchBudgets = async() => {
        try {
            const response = await budgetAPI.getBudget()
            setBudgets(response.data)
            console.log(response.data)
            const warningsResponse = await budgetAPI.getWarnings()
            setWarnings(warningsResponse.data)
            console.log(warningsResponse.data)
        } catch (error) {
            toast.error("Failed to fetch budgets")
            console.log(error)
        }
    }
    return (
        <div className="max-w-full mx-auto p-4">
            <h1 className="text-4xl font-bold text-center">
                <span className="bg-gradient-to-r from-white via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    Budgets
                </span>
            </h1>
            <p className='text-gray-400 text-lg text-center mt-2'>
                Set your own limits
            </p>
        </div>
    )
}

export default Budgets