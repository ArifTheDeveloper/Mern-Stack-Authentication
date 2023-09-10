const mongoose = require('mongoose');


const DB = "mongodb://localhost:27017/authUser";

 mongoose.connect(DB,{
    useUnifiedTopology : true,
    useNewUrlParser : true 
}).then(()=>{
    console.log("Database Connected")
}).catch((error)=>{
    console.log("Error in connection");
});


