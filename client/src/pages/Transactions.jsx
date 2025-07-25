import {useState, useEffect} from 'react';
import { transactionAPI } from '../services/api.js';
import { ArrowUpCircle, ArrowDownCircle, Search, Plus, DollarSign, Trash2Icon, Edit } from 'lucide-react';
import toast from 'react-hot-toast'
import { Link }from 'react-router-dom';

const Transactions = () => {
    const [loading,setLoading] = useState(true)
    const [txns, setTxns] = useState([])
    useEffect(() => {
        fetchTransactions()
    },[])
    
    const fetchTransactions = async () => {
        try {
            const response = await transactionAPI.getTxn()
            setTxns(response.data)
            console.log(response.data)
        } catch(error){
            toast.error("Failed to fetch transactions")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await transactionAPI.deleteTxn(id)
            toast.success("Transaction deleted successfully")
        } catch (error) {
            toast.error("Failed to delete transaction")
            console.log(error)
        }
    }
    const totalIncome = txns.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = txns.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  return (
    <div className='max-w-full mx-auto p-4'>
        <h1 className="text-4xl font-bold text-center">
            <span className="bg-gradient-to-r from-white via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Transactions
            </span>
        </h1>
        <p className='text-gray-400 text-lg text-center mt-2'>
            Manage your transactions here
        </p>
        <div className="flex items-center justify-evenly mt-8 mb-4 max-w-full">
            <div className="flex items-center justify-between gap-20 ">
                <div className="bg-white p-4 rounded-xl hover:cursor-pointer hover:shadow-green-500 hover:shadow-lg hover:scale-105 transition-all duration-3000 ">
                    <div className="flex items-center justfiy-between">
                        <div>
                            <h2 className="text-xl font-bold text-blue mr-10">
                                Total Income 
                            </h2>
                            <p className="text-3xl font-bold text-green-600">
                                ${totalIncome.toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-green-100 rounded-3xl p-4 ml-5">
                            <ArrowUpCircle className='text-green-600' size={35} />
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl hover:cursor-pointer hover:shadow-red-500 hover:shadow-lg hover:scale-105 transition-all duration-3000 ">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-blue mr-10">
                                Total Expenses
                            </h2>
                            <p className="text-3xl font-bold text-red-600">
                                ${totalExpenses.toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-red-100 rounded-3xl ml-5 p-4">
                            <ArrowDownCircle className='text-red-600' size={35} />
                        </div>
                    </div>
                </div>
                <div className=" bg-white p-4 rounded-xl hover:cursor-pointer hover:shadow-blue-500 hover:shadow-lg hover:scale-105 transition-all duration-3000 ">
                    <div className="flex tiems-center justfiy-between">
                        <div>
                            <h2 className="text-xl font-bold text-blue mr-24">
                                Balance
                            </h2>
                            <p className="text-3xl font-bold text-blue-600">
                                {totalIncome > totalExpenses ? (`$${(totalIncome - totalExpenses).toFixed(2)}`) : (`-$${(totalExpenses - totalIncome).toFixed(2)}`)}
                            </p>
                        </div>
                        <div className="bg-blue-200 rounded-3xl p-4 ml-5">
                            <DollarSign className=' text-blue-600' size={30} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-5 mb-5">
            <div className="flex items-center justify-between">
                <input
                    type="text"
                    placeholder='Search transactions...'
                    className='w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button className='text-xl p-3 rounded-full bg-gradient-to-r from-slate-500 to-blue-600 '>Add transaction</button>
            </div>
        </div>
        <div className="max-w-7xl mx-auto">
            {txns.map((txn) => (
                <div key={txn.id} className="bg-white p-4 rounded-xl mt-5 hover:cursor-pointer hover:shadow-blue-500 hover:shadow-lg hover:scale-105 transition-all duration-3000">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-blue">
                                {txn.category.charAt(0).toUpperCase() + txn.category.slice(1)}
                            </h2>
                            <p className="text-gray-600">{txn.description}</p>
                        </div>
                        <div className={`bg-${txn.type === 'income' ? 'green' : 'red'}-100 rounded-3xl p-4`}>
                            <span className={`text-${txn.type === 'income' ? 'green' : 'red'}-600 text-xl font-bold`}>
                                ${txn.amount.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                        {new Date(txn.date).toLocaleDateString()}
                    </p>
                    <div className="flex items-center mt-2">
                        <Link to = {`/edit-transaction/${txn._id}`} className="text-blue-500 hover:text-blue-700 flex items-center space-x-1 mr-5 ">
                            <Edit size = {20} />
                            <span>Edit</span>
                        </Link>
                        <button 
                            onClick={handleDelete(txn._id)}
                            className="text-red-500 hover:text-red-700 flex items-center space-x-1">
                            <Trash2Icon size = {20} />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Transactions
