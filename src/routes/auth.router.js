const express = require('express');
const routerAuth = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const dotenv = require('dotenv');
dotenv.config();



routerAuth.post(`/login`, async (req, res)=> {
    try {
        const { email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        // console.log(passwordHash);
        const user = await User.findOne({email});
        // console.log(user);
        if(!user) {
            throw new Error(`Invalid credentials`);
        }
        const isValidPassword = await user.validatePassword(password);
        if(!isValidPassword) {
            throw new Error(`Invalid credentials`);
        } else {
            // create jwt token
            const token = await user.getJWT();
            res.cookie('token', token, {expires: new Date(Date.now() + 900000)});
        }
        res.send({
            status : true,
            message : 'User logged in successfully.',
            data : {email}
        });
    } catch (error) {
        res.status(500).send(`Error in Login. Err: ${error.message}`);        
    }
});

routerAuth.post(`/signup`, async (req, res)=> {
    const {fname, lname, email, password, gender, age} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    
    const userObj = {
        fname, lname, email, password : passwordHash, gender, age
    }
    // console.log(req.body);
    try {
        const user = new User(userObj);
        const userCreated = await user.save();
        // console.log(userCreated);
        res.status(201).send({
            status : true,
            message : 'User created successfully.',
            data : user
        });
    } catch (error) {
        res.status(500).send(`Error in creating user. Err: ${error.message}`);        
    }
});


module.exports = routerAuth;