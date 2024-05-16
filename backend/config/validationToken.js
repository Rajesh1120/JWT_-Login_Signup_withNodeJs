const jwt = require('jsonwebtoken')

const authenticationUser=async(req,res,next)=>{

    const token=req.headers.authorization
    console.log(token)
    if (!token){
        return res.status(401).json({message:"UnAuthorized"})
    }
    else{
        try{
            const decoded= jwt.verify(token.split(" ")[1],process.env.ACCESS_STRING_TOKEN,)
            console.log(decoded);
            req.user=decoded.user
            console.log(decoded.user)
            next();

        }catch{
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}

module.exports=authenticationUser