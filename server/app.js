const express = require('express');
const app = express();
const cors = require('cors');
const port = 8001;
const  router = require('./routes/router');
require('./db/conn');
const cookieParser = require('cookie-parser');

//configure
app.use(cors());
app.use(express.json());
app.use(router);
app.use(cookieParser());



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
