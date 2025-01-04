const dotenv = require('dotenv');

dotenv.config();

const adminAuth = function(req, res, next) {
    const token = req.headers.token;
    // console.log(token, process.env.AUTH_TOKEN);
    
    if(token !== process.env.AUTH_TOKEN) {
        res.status(401).send('Unauthorized request');
    }else {
        next();
    }
}

module.exports = {
    adminAuth,
}