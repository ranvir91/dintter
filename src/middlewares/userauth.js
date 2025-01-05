const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

dotenv.config();

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        // console.log(token);
        
        if(!token) {
            throw new Error('Invalid token, try after login');
        }
        const decodeToken = jwt.decode(token, process.env.JWT_SECRET);
        const {_id} = decodeToken;
        
        const user = await User.findById(_id).select("-password -__v -updatedAt");
        if(!user) {
            throw new Error('Invalid token!');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send(`Error : ${error.message}`);        
    }
}

module.exports = {
    userAuth,
}