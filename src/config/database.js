const { mongoose } = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DATABASE = 'dintter';

const connectDB = async() => {
    await mongoose.connect(`${MONGO_URI}/${MONGO_DATABASE}`);
}

module.exports = {
    connectDB
}