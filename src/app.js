const express = require('express');
const {connectDB} = require('./config/database');
const User = require('./models/user.model');
const cookies = require("cookie-parser")

const { userAuth } = require('./middlewares/userauth');
const routerUser = require('./routes/user.router');
const routerAuth = require('./routes/auth.router');

const app = express();
const PORT = process.env.PORT || 5000;
const API_V1 = process.env.API_V1 || '/api/v1';

app.use(express.json());
app.use(cookies());

connectDB()
.then(()=>{
    console.log(`Connected to database.`);
    app.listen(PORT, ()=> {
        console.log(`Server is running on ${PORT}`);    
    });
})
.catch((err)=>{
    console.log(`Unable to connect database ${err.message}`);
});


app.get(`${API_V1}/health`, (req, res, next)=>{
    console.log(`1nd route handler`);
});


app.use(`${API_V1}/auth`, routerAuth);
app.use(`${API_V1}/users`, routerUser);






// it can be regex as well | ? + * space
// app.get(/[a-z]/, (req, res)=>{
//     res.send('Dintter api is working.');
// });

// app.use(`${API_V1}/admin`, adminAuth);


// app.use(`${API_V1}/admin/getdata`, adminAuth, (req, res) => {
//     res.status(200).send('test');
// });

// app.use(`${API_V1}/admin/login`, (req, res) => {
//     res.status(200).send('Login page');
// });


// app.use(`${API_V1}/users/login`, (req, res) => {
//     res.status(200).send('Login page');
// });

// app.use(`${API_V1}/users/profile`, userAuth,(req, res) => {
//     throw new Error('Error!');
//     res.status(200).send('profile page');
// });


// // error handling
// app.use('/', (err, req, res, next) => {
//     if(err) {
//         res.send(`Something went wrong... ${err.message}`, 500);
//     }
// });


