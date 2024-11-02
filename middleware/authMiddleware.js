const usertoken = require("../db/models/usertoken")

// authMiddleware
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer', '')
    if (!token) {
        return res.status(401).json({ error: 'Access denied.No token provided' })

    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log("decode@@@@@@@@", decoded)
        const userToken = await usertoken.findOne({
            where: {
                token: token,
                userId: decoded.id
            }
        })
        if (!userToken) {
            return res.status(401).json({ error: 'inValid token or expire token' })
        }
        const currenDate = new Date()
        const expireDate = new Date(userToken.expireDate)
        if (currenDate > expireDate) {
            return res.status(401).json({ error: 'Token expired. login again' })
        }
    } catch (error) {

    }
}

module.exports = { authMiddleware }