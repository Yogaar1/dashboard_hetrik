const jwt = require('jsonwebtoken');
const { Admin } = require('../models'); 

exports.authenticateToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization || req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        console.log("Received Token:", token); 

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const admin = await Admin.findByPk(decoded.id);

        if (!admin) {
            return res.status(401).json({ message: 'Invalid token: Admin not found' });
        }

        req.user = decoded;

        next();
    } catch (error) {
        console.error("Token Verification Error:", error.message); 
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};