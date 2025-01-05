const express = require('express');
const User = require('../models/user.model');
const {userAuth} = require('../middlewares/userauth')

const routerUser = express.Router();



routerUser.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).send({
            status : true,
            message : "User's profile fetched successfully.",
            data : user
        });
    } catch (error) {
        res.status(500).send(`Error in fetching user's profile. Err: ${error.message}`);        
    }
});



routerUser.get(`/send-connection-request`, userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).send({
            status : true,
            message : "Connection request sent successfully.",
            // data : user
        });
    } catch (error) {
        res.status(500).send(`Error in fetching user's profile. Err: ${error.message}`);        
    }
});


routerUser.get(`/list`, async (req, res) => {
    try {
        const users = await User.find({}).select("-password -__v -updatedAt");
        res.status(200).send({
            status : true,
            message : "Users fetched successfully.",
            data : users
        });
    } catch (error) {
        res.status(500).send(`Error in fetching users. Err: ${error.message}`);        
    }
});


routerUser.get(`/:uid`, async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await User.findById(uid).select("-password -__v -updatedAt");
        
        if(!user) {
            res.status(404).send({
                status : true,
                message : "User not found.", data : []
            });
        } else {
            res.status(200).send({
                status : true,
                message : "User fetched successfully.",
                data : user
            });
        }
    } catch (error) {
        res.status(500).send(`Error in fetching one user. Err: ${error.message}`);        
    }
});


routerUser.put(`/:uid`, async (req, res) => {
    try {
        const uid = req.params.uid;
        const {fname} = req.body;
        const user = await User.findById(uid).select("-password -__v -updatedAt");
        if(!user) {
            res.status(404).send({
                status : true,
                message : "User not found.", data : []
            });
        }
        user.fname = fname;
        const updated = user.save();
        if(!updated) {
            res.status(500).send({
                status : true,
                message : "User not updated successfully."
            });
        } else {
            res.status(200).send({
                status : true,
                message : "User updated successfully.",
                data : user
            });
        }
    } catch (error) {
        res.status(500).send(`Error in fetching one user. Err: ${error.message}`);        
    }
});


routerUser.delete(`/:uid`, async (req, res) => {
    try {
        const uid = req.params.uid;
        const userDeleted = await User.findByIdAndDelete(uid);        
        if(!userDeleted) {
            res.status(404).send({
                status : true,
                message : "User not found."
            });
        } else {
            res.status(204).send({
                status : true,
                message : "User deleted successfully."
            });
        }
    } catch (error) {
        res.status(500).send(`Error in fetching one user. Err: ${error.message}`);        
    }
});


module.exports = routerUser;