const aplilogs = require("../../db/models/aplilogs")


const sendResponse = async(res,statusCode,success,message,data=null,errors=null)=>{
    const response = {
        success,
        message,
    }
    if(data !== null) response.data = data
    if(errors !==null) response.erros = errors

    const apiLog = {
        api_name: res.req.originalUrl,
        api_request: JSON.stringify(res.req.body),
        status: statusCode,
        ip_address : res.req.ip,
        message:message,
        response: JSON.stringify(response),
        timestamp: new Date(),
    }
    await aplilogs.create(apiLog)

// console.log("resp*****************",res)
    res.status(statusCode).json(response)
}
module.exports = {sendResponse};