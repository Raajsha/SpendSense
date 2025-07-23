import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api.js";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within an AuthContext')
    }
    return context
}

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')

        if(token && userData){
            setUser(JSON.parse(userData))
        }
        setLoading(false)
    },[])

    const login = async(email,password) => {
        try {
            const response = await authAPI.login({email,password})
            const {token, user: userData} = response.data;

            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(userData))
            setUser(userData)

            toast.success("Login Successful")
            if(userData.role === 'admin'){
                return {success: true, isAdmin: true}
            }
            return {success: true, isAdmin: false}
        } catch (error) {
            const message = error.response?.data?.message || "Login failed"
            toast.error(message)
            console.log(error)
            return {success : false, message}
        }
    }

    const register = async(username,email,password,role) => {
        try {
            const response = await authAPI.register({username,email,password,role})
            toast.success("Registered Successfully")
            return {success: true}
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed"
            toast.error(message)
            console.log(error)
            return {success: false, message}
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        toast.success("Logout Successful")
    }

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated : !!user,
        isAdmin: user?.role === 'admin'
    }

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}