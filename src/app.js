const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);    
});

app.use('/', (req, res)=>{
    res.send('Working, hello from dintter app');
});

app.use('/health', (req, res)=>{
    res.send('Dintter api is working.');
});

