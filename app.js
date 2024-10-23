const express = require('express')
const app = express();
const authRouter = require('./routes/authRoute')
const dotenv = require('dotenv')

dotenv.config()
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'wohoo! Best'
    })
})

app.use('/api/v1/auth',authRouter)

app.use('*',(req,res,next)=>{
    res.status(404).json({
        status:'fail',
        message:'Routes not found'
    })
})
app.listen(process.env.APP_PORT, () => {
    console.log(`server is running on port ${process.env.APP_PORT}`)
})