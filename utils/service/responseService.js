

const sendResponse = (res,statusCode,success,message,data=null,errors=null)=>{
    const response = {
        success,
        message,
        
    }
    if(data !== null) response.data = data
    if(errors !==null) response.erros = errors

    res.status(statusCode).json(response)
}
module.exports = {sendResponse};