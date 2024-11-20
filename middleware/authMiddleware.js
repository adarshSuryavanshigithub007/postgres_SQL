const usertoken = require("../db/models/usertoken");
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();
    console.log("Received token:", token);

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded Token:", decoded);

        if (!decoded.id) {
            return res.status(401).json({ error: 'Invalid token payload. Missing user ID.' });
        }

        const userToken = await usertoken.findOne({
            where: {
                token: token,
                userId: decoded.id
            }
        });

        if (!userToken) {
            return res.status(401).json({ error: 'Invalid token or expired token' });
        }

        const currenDate = new Date();
        const expireDate = new Date(userToken.expireDate);
        if (currenDate > expireDate) {
            return res.status(401).json({ error: 'Token expired. Login again' });
        }

        next();  // Proceed to the next middleware if everything is okay
    } catch (error) {
        console.error("Error during token verification:", error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { authMiddleware };
