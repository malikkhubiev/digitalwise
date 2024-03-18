const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS") next();
    try {
        const encryptedEmail = req.body.encryptedEmail;
        if (!encryptedEmail) return res.status(401).json({message: "Yours email isn't verified"});
        const decodedEmail = jwt.verify(encryptedEmail, SECRET_KEY);
        delete(req.body.encryptedEmail);
        req.body.email = decodedEmail.email;
        return next();
    } catch (e) {
        res.status(401).json({message: "You are not authorized"});
    };
}