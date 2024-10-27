const { validationResult } = require("express-validator");

const validate = (validation)=>{
    console.log("validation^^^^^^^^^^^",validation)
    return async (req,res,next)=>{
        try {
            await Promise.all(validation.map((validation)=> validation.run(req)));
        } catch (err) {
            console.error(`Validation error: ${err.message}`);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const error = validationResult(req)
        console.log("455555555",error)
        if(error.isEmpty()){
            return next()
        }
        const formattedError = error.array().reduce((acc,error)=>{
            acc[error.path] = error.msg
            console.log("acc-----------",acc)
            return acc
        },{})
        res.status(400).json({
            error:formattedError,
            message:"The given data was invalid"
        })
    }
}

module.exports = {
    validate
}