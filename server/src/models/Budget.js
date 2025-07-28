import mongoose from 'mongoose'

const budgetSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category : {
        type: String,
        required : true
    },
    budget : {
        type : Number,
        required: true
    },
    note : {
        type: String,
        required: false
    }
},{timestamps: true,versionKey: false})

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget