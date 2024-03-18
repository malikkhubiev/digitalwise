const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS") next();
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) return res.status(401).json({message: "You are not authorized"});
        const decoded = jwt.verify(token, SECRET_KEY);
        req.body = {
            ...req.body,
            id: decoded.id,
            email: decoded.email
        };
        return next();
    } catch (e) {
        res.status(401).json({message: "You are not authorized"});
    };
};