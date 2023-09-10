const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const keysecret = "arifhussainlovessuffiandbobby";

const authenticate = async(req,res, next)=>{
  
    try {
        
        const token = req.headers.authorization;
        
        const varifytoken = jwt.verify(token,keysecret);
        const rootUser  = await userdb.findOne({_id : varifytoken._id});
     
        if(!rootUser){
            throw new Error("user not found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    } catch (error) {
        res.status(401).json({status : 401,message : "unauthorize no token provided"})
    }
}

module.exports = authenticate;