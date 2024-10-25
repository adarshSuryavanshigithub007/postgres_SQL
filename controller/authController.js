const { where } = require("sequelize")
const user = require("../db/models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

const SignUp = catchAsync(async (req, res, next) => {
    try {
        const isUserexist = await user.findOne({ where: { email: req.body.email } })
        if (!['1', '2'].includes(req.body.userType)) {
            return next(new AppError('Invalid User Type', 400))
        }
        if (isUserexist) {
            return next(new AppError('User already exist', 400))
        }

        const { password, confirmPassword } = req.body
        if (password !== confirmPassword) {
            return next(new AppError('Password does not match', 400))
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        req.body.confirmPassword = hashedPassword;
        const newUser = await user.create(req.body);
        next(new AppError('User created successfully', 201))
    } catch (error) {
        next(error)
    }
})

const SignIn = catchAsync(async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new AppError('Email and password are required', 400))
        }

        const existUser = await user.findOne({ where: { email } })
        if (!existUser) {
            return next(new AppError('User not found', 400))
        }
        const isMatch = await bcrypt.compare(password, existUser.password)
        if (!isMatch) {
            return next(new AppError('Invalid password', 400))
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        return res.status(201).json({
            message: "User logged in successfully",
            token: token,
            status: true
        })
    } catch (error) {
        next(error)
    }
})

module.exports = { SignUp, SignIn }