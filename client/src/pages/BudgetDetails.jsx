import { budgetAPI, transactionAPI } from "../services/api.js";
import {useState, useEffect} from 'react'
import { Link,useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeftCircle, Edit, Trash2Icon } from "lucide-react";


const BudgetDetails = () => {
    const {id} = useParams()
    const [budget, setBudget] = useState({});
    const [loading,setLoading] = useState(true)
    const [txns, setTxns] = useState([])
    useEffect(() => {
        fetchBudget()
    },[id])

    useEffect(() => {
        if(budget){
            fetchTxns()
        }
    },[budget.category])

    const fetchBudget = async() => {
        try {
            const response = await budgetAPI.getBudgetById(id)
            if(response.status === 200){
                setBudget(response.data)
                console.log(response.data)
            }            
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch budget")
        } finally {
            setTimeout(() => setLoading(false), 1000)

        }
    }

    const fetchTxns = async() => {
        try {
            const response = await transactionAPI.getTxn({
                category: budget.category,
                type: "expense"
            })
            setTxns(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await transactionAPI.deleteTxn(id)
            toast.success("Transaction deleted successfully")
            setTxns(txns.filter(t => t._id !== id))
        } catch (error) {
            toast.error("Failed to delete transaction")
            console.log(error)
        }
    }    

    const amtSpent = txns.reduce((sum,t) => sum+t.amount, 0)

    const limit = budget.budget || 1
    const progress = Math.min((amtSpent/limit)*100,100).toFixed(2)
    return (
        
        <div className="max-w-5xl mx-auto p-2 mt-2 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-lg rounded-2xl pb-6 pt-6">
            {loading === true ? (
                <div className="flex justify-center items-center">
                    <div className="flex items-center justify-center min-h-64">
                        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary-600"></div>
                    </div> 
                </div> 
            ) : (
                <>
                    <div className="flex items-center">
                        <Link to ='/budgets'>
                            <ArrowLeftCircle size ={40} className="text-white" />
                        </Link>
                        <h1 className="text-3xl font-bold ml-4 text-white">
                            {String(budget.category).charAt(0).toUpperCase() + String(budget.category).slice(1)}
                        </h1>
                    </div>
                    {budget.note ? (
                        <div className="text-white mt-4 text-xl ml-14">
                                {budget.note}
                        </div>
                    ) : (
                        <div className="text-gray-400 mt-4 text-xl ml-14">
                            No note added
                        </div>
                    )}
                    <div className="text-lg text-white mt-2 ml-14">${amtSpent} spent out of ${budget.budget}</div>
                    <div className="max-w-4xl mx-auto bg-white rounded-full h-4 mt-4">
                        <div
                        className={`
                          h-4 rounded-full transition-all duration-500
                          ${progress < 50 ? "bg-green-500"
                            : progress < 80 ? "bg-yellow-500"
                            : "bg-red-500"}
                        `}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {txns.length > 0 ? (
                    <div className="max-w-4xl mx-auto ">
                        {txns.map((txn) => (
                            <div key={txn._id} className="bg-white p-4 rounded-xl mt-5 hover:cursor-pointer hover:shadow-blue-500 hover:shadow-lg hover:scale-105 transition-all duration-3000">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-blue">
                                            {txn.category.charAt(0).toUpperCase() + txn.category.slice(1)}
                                        </h2>
                                        <p className="text-gray-600">{txn.description}</p>
                                    </div>
                                    <div className={`bg-${txn.type === 'income' ? 'green' : 'red'}-100 rounded-3xl p-4`}>
                                        <span className={`text-${txn.type === 'income' ? 'green' : 'red'}-600 text-lg font-bold`}>
                                            ${txn.amount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <p className="text-gray-500 text-sm mr-5">
                                        {new Date(txn.date).toLocaleDateString()}
                                    </p>                        
                                    <Link to = {`/edit-transaction/${txn._id}`} className="text-blue-500 hover:text-blue-700 flex items-center space-x-1 mr-5 ">
                                        <Edit size = {16} />
                                        <span>Edit</span>
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(txn._id)}
                                        className="text-red-500 hover:text-red-700 flex items-center space-x-1">
                                        <Trash2Icon size = {16} />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-4xl min-h-80 mx-auto translate-y-1/2 text-white text-2xl text-center">
                        <p>No transactions made in this category yet</p>
                    </div>
                )}
            </>
            )}     
        </div>
    )
}

export default BudgetDetails