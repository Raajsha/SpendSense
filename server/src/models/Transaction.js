import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    },
    type: {
        type: String,
        enum: ['income','expense'],
        required: true
    },
    category : {
        type: String,
        required : true
    },
    amount : {
        type: Number,
        required: true
    },
    note: {
        type: String,
    },
    date : {
        type: Date,
        default: Date.now
    },
},{
    timestamps: true,
    versionKey: false
})

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction