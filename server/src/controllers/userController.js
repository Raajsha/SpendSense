import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id).select("-password");
        if(!user) return res.status(404).json({message: "User not found", id: `${req.params.id}`})
            res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch profile"})
        console.log(error)
    }
}

export const updateProfile = async(req,res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)

        if(!user) return res.status(404).json({message: "User not found"})
        
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        const updatedUser = await User.findByIdAndUpdate(id,{$set : req.body},{new : true})

        const displayUpdatedUser = await User.findById(id).select("-password")

        res.status(200).json(displayUpdatedUser)
    } catch (error) {
        res.status(500).json({message: "Failed to update profile"})
        console.log(error)
    }
}

export const deleteProfile = async (req,res) => {
    try{
        const id = req.params.id
        const user = await User.findById(id)
        if(!user) return res.status(404).json({message: "User not found"})
        
        await User.findByIdAndDelete(id) 
        res.status(200).json({message: "Profile deleted succesfully"})
    } catch(error) {
        res.status(500).json({message: "Failed to delete profile"})
    }
}