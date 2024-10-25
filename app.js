const express = require('express')
const app = express();
const authRouter = require('./routes/authRoute')
const dotenv = require('dotenv');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

dotenv.config()

app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.use('*', catchAsync(async (req, res, next) => {
    throw new AppError(`cont't fing ${req.originalUrl} on this server`, 404)
}))

app.use(globalErrorHandler)

app.listen(process.env.APP_PORT, () => {
    console.log(`server is running on port ${process.env.APP_PORT}`)
})