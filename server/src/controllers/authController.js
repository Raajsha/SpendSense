import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const registerUser = async (req,res) => {
    try {
        const {username, email, password, role} = req.body

        const exists = await User.findOne({email})

        if(exists) return res.status(400).json({message: "User already exists"})
        
        const newUser = new User({
            username,
            email,
            password,
            role
        })
        await newUser.save()
        res.status(201).json({message: "User created sccessfully"})
    } catch (error) {
        res.status(500).json({message : "Failed to create user"})
        console.log(error)  
    }
}

export const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password ) return res.status(400).json({message: "Bad request"})

        const user = await User.findOne({email})
        if(!user) return res.status(404).json({message: "User does not exist"})

        const match = await bcrypt.compare(password,user.password)
        if(!match) return res.status(400).json({message: "Invalid credentials"})

        const token =jwt.sign({id : user._id, username : user.username},process.env.JWT_SECRET,{
        const token =jwt.sign({id : user._id, username : user.username, role: user.role},process.env.JWT_SECRET,{
            expiresIn : "1d"
        });

        res.status(200).json({token,user : {user: user._id, username : user.username, role: user.role}})
    } catch (error) {
        res.status(500).json({message : "Login failed"})
        console.log(error)
    }
}