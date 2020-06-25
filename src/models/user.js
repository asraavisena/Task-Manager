const mongoose = require('mongoose')
const validator = require('validator')
const bycrpt = require('bcryptjs')
const { findOne } = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password includes "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        // custom validator
        validate(value){
            if (value<0){
                throw new Error('Age must be positive number')
            }
        }
    }
})

// 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login!')
    }

    const isMatch = await bycrpt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

// middelware, hash the plain text password before savings
userSchema.pre('save', async function(next){
    const user = this
    
   if (user.isModified('password')){
       user.password = await bycrpt.hash(user.password, 8)
   }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports= User