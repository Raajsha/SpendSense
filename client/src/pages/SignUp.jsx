import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const {register} = useAuth()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password : "",
        confirmPassword : "",
        role: ""
    })

    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        username: /^[a-zA-Z0-9_]{3,20}$/,
    }

    const validate = (name, value) => {
        switch(name) {
            case "email":
                if (!patterns.email.test(value)) {
                    return "Invalid email format";
                }
                return undefined;
            case "password":
                if (!patterns.password.test(value)) {
                    return "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character";
                }
                return undefined;
            case "username":
                if (!patterns.username.test(value)) {
                    return "Username must be 3-20 characters long and can only contain letters, numbers, and underscores";
                }
                return undefined;
            case "confirmPassword":
                if (value !== formData.password) {
                    return "Passwords do not match";
                }
                return undefined;
        }
        return undefined;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })

        setErrors({
            ...errors,
            [e.target.name] : validate(e.target.name, e.target.value)
        })
    }

    const handleSubmit =  (e) => {
        e.preventDefault()
        setLoading(true)  
        const validationErrors = {}  
        Object.keys(formData).forEach((key) => {
            const error = validate(key, formData[key])
            if (error) {
                validationErrors[key] = error
            }
        })
        setErrors(validationErrors)
        if (Object.keys(validationErrors).length > 0) {
            setLoading(false)
            return
        }
        try {
            register(formData.username, formData.email, formData.password, formData.role)
            navigate('/')
        } catch (error) {
            toast.error("Registration failed")
            console.log(error)
        } finally {
            setLoading(false)
        }   
        }

    return (
     <div className="max-w-md mx-auto mt-4">
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-8">
                <div className="font-bold text-3xl">Sign up</div>
                <p className="text-gray-600 mt-2">Join us to become financially smart</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-md font-medium text-gray-700 ">
                        Username
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 " size = {16} />
                        <input 
                            type = "text"
                            name = "username"
                            id = "username"
                            value =  {formData.username}
                            onChange = {handleChange}
                            required
                            placeholder = "Enter your username"
                            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:ring-offset focus:ring-blue-500"
                        />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-md font-medium text-gray-700 ">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 " size = {16} />
                        <input 
                            type = "email"
                            name = "email"
                            id = "email"
                            value =  {formData.email}
                            onChange = {handleChange}
                            required
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:ring-offset focus:ring-blue-500"
                        />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="password" className="block text-md font-medium text-gray-700 ">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 " size = {16} />
                        <input 
                            type = {showPassword ? "text" : "password"}
                            name = "password"
                            id = "password"
                            value =  {formData.password}
                            onChange = {handleChange}
                            required
                            placeholder = "Enter your password"
                            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:ring-offset focus:ring-blue-500"
                        />
                        {showPassword ? (
                            <EyeOff 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                size = {16}
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                size = {16}
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                </div>
                
                <div>
                    <label htmlFor="confirmPassword" className="block text-md font-medium text-gray-700 ">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 " size = {16} />
                        <input 
                            type = {showConfirmPassword ? "text" : "password"}
                            name = "confirmPassword"
                            id = "confirmPassword"
                            value =  {formData.confirmPassword}
                            onChange = {handleChange}
                            required
                            placeholder = "Confirm your password"
                            className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-lg focus:ring-offset focus:ring-blue-500"
                        />
                        {showConfirmPassword ? (
                            <EyeOff 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                size = {16}
                                onClick={() => setShowConfirmPassword(false)}
                            />
                        ) : (
                            <Eye 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                size = {16}
                                onClick={() => setShowConfirmPassword(true)}
                            />
                        )}

                    </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                    <label className="text-md font-medium text-gray-700">
                        Choose your role
                    </label>
                    <select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="border border-gray-400 rounded-lg px-4 py-2 focus:ring-offset focus:ring-blue-500"
                    >
                        <option value="" disabled>Select your role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </form>
            <button 
            onClick={handleSubmit}
            disabled= {loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-6 hover:bg-blue-700 transition-colors disabled:opacity-50">
                {loading ? "Signing up..." : "Sign Up"}
            </button>
            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
     </div>  
    )
}

export default SignUp