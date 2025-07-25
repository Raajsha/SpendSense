import { transactionAPI } from "../services/api.js";
import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { div } from "framer-motion/client";

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
                return undefined
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
            await transactionAPI.addTxn(formData)
            toast.success("Transaction added successfully")
            navigate('/transactions')
        } catch (error) {
            toast.error("Failed to add transaction")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container ">
            <h1 className="text-center text-4xl text-white">Add Transaction</h1>

            <form onSubmit = {handleSubmit} className="max-w-xl mx-auto p-4 text-white ">
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
                    <div className="mt-4">
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
                    <div className="mt-4">
                        <label htmlFor="category" className="block mb-2 text-xl">Category</label>
                        <input 
                            type = "text"
                            id = 'category'
                            name = 'category'
                            value = {formData.category}
                            onChange={handleChange}
                            required
                            placeholder = "Enter amount"
                            className="w-full p-2 border border-gray-300 rounded-lg text-black"
                        />
                        {errors.category && <p className="text-red-500 font-medium text-sm">{errors.amount}</p>}
                    </div>
                    <div className="mt-4">
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

        </div>
    )
}

export default AddTransaction