import {User} from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import {generateTokenAndSetCookie} from '../utils/generateTokenAndSetCookie.js'
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/Emails.js'

export const signup = async (req,res) => {
   const {email,password,name} = req.body
   try
   {
    if(!email || !name || !password){
        return res.status(400).json({message: 'All Fields are Required !'})
    }
    const userAlreadyExist = await User.findOne({ email })
    if(userAlreadyExist){
        return res.status(400).json({message: 'User Already Exist !'})
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const verificationToken = Math.floor(100000+Math.random()*900000).toString()

    const user = new User({
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt:Date.now()+24*60*60*1000
    })
    await user.save()

    generateTokenAndSetCookie(res,user._id)
    await sendVerificationEmail(user.email , verificationToken)

    res.status(201).json({
        success:true,
        user:{
            ...user._doc,
            password: null
        }
    })
   }
   catch(error)
   {
    console.error(error)
    res.status(500).json({message: 'Internal Server Error !'})
   } 
}


export const verifyEmail = async (req,res) => {
    const {code} = req.body

    try
    {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })
        if(!user){
            return res.status(400).json({message: 'Invalid or Expired Verification Code!'})
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()

        await sendWelcomeEmail(user.email, user.name)
        res.json({message: 'Email Verified Successfully!',user:{
            ...user._doc,
            password: undefined
        }})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error!'})
    }
}


export const login = async (req,res) => {
    const {email,password} = req.body

    try
    {
        const user = await User.findOne({email}) 
        if(!user){
            return res.status(400).json({message: 'User Not Found!'})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid Credentials !'})
        }

        generateTokenAndSetCookie(res , user._id)
        user.lastLogin = new Date()
        await user.save()

        res.status(200).json({
            success:true,
            message:"Logged In Successfully !",
            user:{
                ...user._doc,
                password: undefined
            }
        })            
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error!'})
    }
}


export const logout = async (req,res) => {
    res.clearCookie('token')
    res.json({message: 'Logged Out Successfully!'})
}


export const forgotPassword = async (req,res) => {
    const {email} = req.body

    try
    {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'User Not Found!'})
        }

        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpiresAt = Date.now()+ 1*60*60*1000

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt

        await user.save()

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
        res.status(200).json({message: 'Reset Password Email Sent!'})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error!'}) 
    }
}


export const resetPassword = async (req,res) => {
    try
    {
        const {token} = req.params
        const {password} = req.body
        
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        })
        if(!user){
            return res.status(400).json({message: 'Invalid or Expired Reset Password Token!'})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined
        await user.save()

        await sendResetSuccessEmail(user.email)
        res.status(200).json({message: 'Password Reset Successfully!'})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error!'})   
    }
}


export const checkAuth = async (req, res) => {
    try
    {
        const user = await User.findById(req.userId).select("-password")
        if(!user){
            return res.status(401).json({message: 'User Not Found!'})
        }
        res.status(200).json({user})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: 'Internal Server Error!'})
    }
}