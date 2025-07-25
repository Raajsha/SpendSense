import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    role: {
        type:String,
        enum : ["user", "admin"],
        default: "user"
    },
    suspended: {
        type: Boolean,
        default: false
    }
},{timestamps: true, versionKey: false});

userSchema.pre('save',async function(next) {

    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

    next();
});

const User = mongoose.model('User',userSchema)

export default User