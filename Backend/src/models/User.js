import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        match: /^[a-zA-Z0-9_]{3,20}$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Regex for email
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        select: false // it prevents for accidental exposure of password in queries
    },
    Role: {
        type: String,
        enum: ['user', 'admin']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model("User", userSchema)
export default User;