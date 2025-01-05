const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const userSchema = new mongoose.Schema({
    fname : {
        type : String,
        required : true,
        trim : true,
        minlength : 2,
        maxlength : 30
    },
    lname : {
        type : String,
        required : false,
        trim : true,
        minlength : 2,
        maxlength : 30
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email id");
            }
        }
    },
    password : {
        type :String,
        required : true,
        trim : true
    },
    age : {
        type : Number,
        min : 18,
        max : 99
    },
    gender : {
        type : String,
        enum: {
            values: ['Male', 'Female', 'Others'],
            message: '{VALUE} is not supported for gender'
        }
    },
    about : {
        type : String,
        default : "I am using Dintter"
    },
    photoUrl : {
        type : String,
        default : "https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-15.jpg",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid photo url given");
            }
        }

    }
}, {timestamps: true});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
    return token;
};

userSchema.methods.validatePassword = async function (passwordInput) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInput, passwordHash);
    return isPasswordValid;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
