const user = require("../db/models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { sendResponse } = require("../utils/service/responseService")
const usertoken = require("../db/models/usertoken")

const SignUp = async (req, res, next) => {
    try {
        const isUserexist = await user.findOne({ where: { email: req.body.email } })
        if (!['1', '2'].includes(req.body.userType)) {
            return sendResponse(res, 400, false, 'Invalid User Type', null, {
                error: 'Invalid User Type'
            })
        }
        if (isUserexist) {
            return sendResponse(res, 400, false, 'User already exist', null, {
                error: 'User already exist'
            })
        }

        const { password, confirmPassword } = req.body
        if (password !== confirmPassword) {
            return sendResponse(res, 400, false, 'Password does not match', null, {
                error: 'Password does not match'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        req.body.confirmPassword = hashedPassword;
        const newUser = await user.create(req.body);
        const newUserWithoutPassword = {
            id: newUser.id,
            email: newUser.email,
            userType: newUser.userType,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        }
        return sendResponse(res, 400, true, 'User created successfully', {
            data: newUserWithoutPassword,
        })
    } catch (error) {
        next(error)
    }
}

const SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return sendResponse(res, 400, false, 'Email and password are required', null, {
                email: 'Email required',
                password: 'password required'
            })
        }
        const existUser = await user.findOne({ where: { email } })
        if (!existUser) {
            return sendResponse(res, 400, false, 'User not found', null, {
                email: 'User not found'
            })
        }
        const isMatch = await bcrypt.compare(password, existUser.password)
        if (!isMatch) {
            return sendResponse(res, 400, false, 'Invalid password', null, {
                password: 'Invalid password please try agin'
            })
        }
        const userWithOutPassword = {
            id: existUser.id,
            firstName: existUser.firstName,
            lastName: existUser.lastName,
            email: existUser.email,
            userType: existUser.userType,
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXP })

        // clc exp token 
        const expireAt = new Date();
        expireAt.setHours(expireAt.getHours() + parseInt(process.env.TOKEN_EXP))
            console.log("dat3333333",expireAt)
        await usertoken.create({
            user_id : existUser.id,
            token:token,
            expire_at : expireAt
        })

        return sendResponse(res, 201, true, 'User logged in successfully', {
            user: userWithOutPassword,
            token: token,
        })
    } catch (error) {
        return sendResponse(res, 500, false, null, null, error.message)
    }
}

module.exports = { SignUp, SignIn }