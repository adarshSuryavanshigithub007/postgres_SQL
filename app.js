const express = require('express')
const authRouter = require('./routes/authRoute')
const dotenv = require('dotenv');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const cluster = require('cluster')
const os = require('os')
const process = require('node:process');
const port = process.env.PORT || 3000;
const numCPUs = os.cpus().length;
console.log("num of cpu", process.pid)
dotenv.config()
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    const app = express();

    app.get('/heavy', (req, res) => {
        let total = 0;
        for (let i = 0; i < 100000000; i++) {
            total += i
        }
        res.send(`total req hits: ${total}`);

    })
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
    app.use(express.json())

    app.use('/api/v1/auth', authRouter)

    app.use('*', (req, res, next) => {
        throw new AppError(`cont't fing ${req.originalUrl} on this server`, 404)
    })

    app.use(globalErrorHandler)
}



