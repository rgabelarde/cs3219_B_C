const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).send("Access Denied due to unauthorized request");
    }
    try {
        token = token.split(' ')[1] // Remove Bearer from string

        if (token === 'null' || !token) {
            return res.status(401).send('Unauthorized request');
        }

        let verifiedUser = jwt.verify(token, process.env.SECRET_KEY);   // process.env.SECRET_KEY => 'secretKey'
        if (!verifiedUser) {
            return res.status(401).send('Unauthorized request');
        }

        req.user = verifiedUser; // user_id & user_type_id
        next();
    } catch (error) {
        res.status(401).send("Invalid Token");
    }
}

exports.isUserOrAdmin = async (req, res, next) => {
    if (req.user.user_type_id === 0 || req.user.user_type_id === 1) {
        next();
    } else {
        return res.status(403).send("Unauthorized, please login!");
    }
}

exports.isUser = async (req, res, next) => {
    if (req.user.user_type_id === 0) {
        next();
    } else {
        return res.status(403).send("Unauthorized, this action requires you to login!");
    }
}

exports.isAdmin = async (req, res, next) => {
    if (req.user.user_type_id === 1) {
        next();
    } else {
        return res.status(403).send("Unauthorized, require admin rights!");
    }
}