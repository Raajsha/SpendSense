import toast  from 'react-hot-toast'
import {useState, useEffect} from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import {Mail, Lock, Eye, EyeOff} from 'lucide-react'
import { Link } from 'react-router-dom'

const Login = () => {
    const {login, isAuthenticated} = useAuth()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const patterns ={
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }

    const validate  = (name, value) => {
        switch(name) {
            case 'email':
                if (!patterns.email.test(value)){
                    return "Invalid email format"
                }
                return undefined
            default:
                return undefined
        }
    }
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

    const handleSubmit = (e) => {
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
            login(formData.email, formData.password)
            navigate('/home')
        } catch (error) {
            toast.error("Login failed")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if(isAuthenticated) {
            navigate('/home')
        }
    })
  return (
    <div className='max-w-md mx-auto mt-12'>
        <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold">
                    Login to Speed Sense    
                </h2>
                <p className="text-gray-600 mt-2">
                    Enter your email and password to continue    
                </p> 
            </div>

            <form onSubmit={handleSubmit} className='space-y-6' >
                <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-3'>
                        Email
                    </label>
                    <div className="relative">
                        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size = {20}/>
                        <input
                            type = 'email'
                            id = 'email'
                            name = 'email'
                            value = {formData.email}
                            onChange ={handleChange}
                            placeholder = 'Enter your email'
                            required
                            className='w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:'
                        />
                    </div>
                </div>
                {errors.email && (<p className='text-red-500 text-sm'>{errors.email}</p>)}

                <div >
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-3'>
                    Password
                    </label>
                    <div className="relative">
                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' size = {20}/>
                        <input
                        type = {showPassword ? 'text' : 'password'}
                        id = 'password'
                        name = 'password'
                        value = {formData.password}
                        onChange ={handleChange}
                        placeholder = 'Enter your password'
                        required
                        className='w-full pl-10 pr-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        {showPassword ? (
                            <EyeOff 
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                                size = {20}
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye 
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer'
                                size = {20}
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                </div>
                {errors.password && errors.password.length > 0 && (<p className='text-red-500 text-sm'>{errors.password}</p>)}
            </form>
            <div className="mt-6">
                <button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
            <div className="mt-6 text-center">
                <p className='text-gray-600'>
                    Dont have an account?{ ' ' }
                    <Link to = '/signup' className='text-blue-600 hover:underline'>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login
