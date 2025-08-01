import { transactionAPI } from "../services/api.js";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeftCircle } from "lucide-react";

const AddTransaction = () => {
    const [formData, setFormData] = useState({
        type: '',
        category: '',
        amount: '',
        note: '',
        date: new Date().toISOString().split('T')[0] // Deafult to today's date
    })
    const [loading,setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name] : validate(e.target.name,e.target.value)
        })
    }

    const validate = (name,value) => {
        switch(name) {
            case 'type':
                if(!value) {
                    return "Transaction type is required"
                }
                break;
            case 'category': 
                if(!value) {
                    return "Category is required"
                }
                break;
            case 'amount':
                if(!value || isNaN(value) || value <= 0) {
                    return "Enter a valid amount"
                }
                break;
            default: 
                return ''
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const validationErrors = {}
        Object.keys(formData).forEach((key) => {
            const error = validate(key, formData[key])
            if (error) {
                validationErrors[key] = error
            }
        })
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setLoading(false)
            return
        }
        setErrors({})
        try {
            const response = await transactionAPI.addTxn(formData)
            if(response.status === 200){
                toast.success("Transaction added successfully")
                navigate('/transactions')
            }
        } catch (error) {
            toast.error("Failed to add transaction")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-lg rounded-2xl pb-6 pt-6 max-w-2xl mx-auto mt-4">
            <div className="flex items-center">
                <Link to = '/transactions'>
                    <ArrowLeftCircle className = 'ml-16 mr-24 text-white' size={40} />
                </Link>
                <h1 className="text-center text-4xl font-bold text-blue-300">Add Transaction</h1>
            </div>

            <form onSubmit = {handleSubmit} className="max-w-xl mx-auto p-6 text-white ">
                <div className="form-group">
                    <div>
                        <label htmlFor="amount" className="block mb-2 text-xl">Amount</label>
                        <input 
                            type = "number"
                            id = 'amount'
                            name = 'amount'
                            value = {formData.amount}
                            onChange={handleChange}
                            required
                            placeholder = "Enter amount"
                            className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        />
                        {errors.amount && <p className="text-red-500 font-medium text-sm">{errors.amount}</p>}
                    </div>
                    <div className="mt-2">
                        <label htmlFor="type" className="block mb-2 text-xl">Transaction Type</label>
                        <select 
                            id = 'type'
                            name = 'type'
                            value = {formData.type}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        >
                            <option value="">Select type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        {errors.type && <p className="text-red-500 font-medium text-sm">{errors.type}</p>}
                    </div>
                    <div className="mt-2">
                        <label htmlFor="category" className="block mb-2 text-xl">Category</label>
                        <input 
                            type = "text"
                            id = 'category'
                            name = 'category'
                            value = {formData.category}
                            onChange={handleChange}
                            required
                            placeholder = "Enter the category"
                            className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        />
                        {errors.category && <p className="text-red-500 font-medium text-sm">{errors.amount}</p>}
                    </div>
                    <div className="mt-2">
                        <label htmlFor="note" className="block mb-2 text-xl">Note</label>
                        <input 
                            type = "text"
                            id = 'note'
                            name = 'note'
                            value = {formData.note}
                            onChange={handleChange}
                            placeholder = "Write a note"
                            className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="date" className="block mb-2 text-xl">Date</label>
                        <input 
                            type = "date"
                            id = 'date'
                            name = 'date'
                            value = {formData.date}
                            onChange={handleChange}
                            required
                            placeholder = "Enter amount"
                            className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        />
                    </div>
                </div>
            </form>
            <div className=" w-full flex items-center justify-evenly">
                <button type='submit'onClick= {handleSubmit} className="p-3 text-lg rounded-full bg-blue-700">Add transaction</button>
            </div>
            
        </div>
    )
}

export default AddTransaction