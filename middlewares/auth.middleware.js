const jwt = require('jsonwebtoken');
const config = require('./config.middleware');

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, config.JWT_SECRECT, (err, decoded) => {
            if (err) {
                return res.status(401).send({ msg: "Invalid token!" });
            }
            req.user = token;
            next();
            return;
        })
    }
    return res.status(401).send({ msg: "Token is not supplied!" });
}

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({ msg: "Admin's token is not valid!"});
}

const getToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            isAdmin: user.isAdmin,
        },
        config.JWT_SECRECT,
        {
            expiresIn: '48h'
        }
    );
}

module.exports = {
    getToken, isAuth, isAdmin
}