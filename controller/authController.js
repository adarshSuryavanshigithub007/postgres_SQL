const { where } = require("sequelize")
const user = require("../db/models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const SignUp = async (req, res, next) => {
    try {
        const isUserexist = await user.findOne({ where: { email: req.body.email } })
        // console.log("rtttttttttt",isUserexist)
        if (isUserexist) {
            return res.status(400).json({ message: "User already exist" })
        }
        const { password, confirmPassword } = req.body
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password does not match"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        req.body.confirmPassword = hashedPassword;
        const newUser = await user.create(req.body);
        return res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (error) {
        console.log(error)
    }
}

const SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const existUser = await user.findOne({ where: { email } })
        if (!existUser) {
            res.status(400).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, existUser.password)
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        return res.status(201).json({
            message: "User logged in successfully",
            token: token,
            status: true
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { SignUp, SignIn }