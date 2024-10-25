const sendErrorDev = (error, res) => {
    const { statusCode = 500, message, status = 'error', stack } = error;

    res.status(statusCode).json({ status, message, stack });
}

const sendErrorProd = (error,res)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const status = error.status || 'error';
    const stack = error.stack;

    res.status(statusCode).json({
        status,
        message,
    })
    console.log(err.name, error.message,stack)
    return res.status(500).json({
        status : 'error',
        message:'Something went Very Wrong'
    })
}

const globalErrorHandler = (err, req, res, next) => {
    (err, req, res, next) => {
        res.status(err.statusCode).json({
            status: 'fail',
            message: err.message,
            stack: err.stack
        })

    }
    if (process.env.NODE_ENV === 'development') {
        return sendErrorDev(err, res)
    }
    sendErrorProd(err,res)

}

module.exports = globalErrorHandler