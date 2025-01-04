const express = require('express');
const { adminAuth } = require('./middlewares/adminauth');
const { userAuth } = require('./middlewares/userauth');
const app = express();
const PORT = process.env.PORT || 5000;
const API_V1 = process.env.API_V1 || '/api/v1';

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);    
});

app.get(`${API_V1}/health`, (req, res, next)=>{
    console.log(`1nd route handler`);
});

// it can be regex as well | ? + * space
// app.get(/[a-z]/, (req, res)=>{
//     res.send('Dintter api is working.');
// });

app.use(`${API_V1}/admin`, adminAuth);


app.use(`${API_V1}/admin/getdata`, adminAuth, (req, res) => {
    res.status(200).send('test');
});

app.use(`${API_V1}/admin/login`, (req, res) => {
    res.status(200).send('Login page');
});


app.use(`${API_V1}/users/login`, (req, res) => {
    res.status(200).send('Login page');
});

app.use(`${API_V1}/users/profile`, userAuth,(req, res) => {
    throw new Error('Error!');
    res.status(200).send('profile page');
});


// error handling
app.use('/', (err, req, res, next) => {
    if(err) {
        res.send(`Something went wrong... ${err.message}`, 500);
    }
});


