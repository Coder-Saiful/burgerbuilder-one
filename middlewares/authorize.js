const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send("<h1 style='font-family: sans-serif; color: #863c3c;'>Access denided. No token provided.</h1>");

    try {
        const decode = jwt.verify(token.split(' ')[1].trim(), process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(400).send("Invalid token!");
    }
}