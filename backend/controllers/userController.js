const user=require('../model/userModel')
const bycrpt=require('bcrypt')
const dotenv=require('dotenv').config();
const jwt=require('jsonwebtoken')



const registerData=async(req,res)=>{
    console.log(req.body);

    const {username,email,password}=req.body;

    const userInDB=await user.findOne({email});
    if (userInDB){
        res.status(400).json({message:"User Email already exists"})
    }
    else{
        const hashpassword=await bycrpt.hash(password,10);
        const createUser=await user.create({
            username,
            email,
            password:hashpassword,
        })
        if (createUser){
            res.status(200).json({username:username,message: "user created"})
        }
    }
}

const loginUserData=async(req,res)=>{
        console.log(req.body)
        const {email, password}=req.body
        const userAvailable=await user.findOne({email})
        console.log(userAvailable)
        const decodePassword=await bycrpt.compare(password,userAvailable.password)
        if (userAvailable && decodePassword){

            const token=await jwt.sign({
                user:{
                    email:userAvailable.email,
                    id:userAvailable.id,
                    username:userAvailable.username
                }
                

            },process.env.ACCESS_STRING_TOKEN)
            res.status(200).json({message:"successfully logged in ", token:token})
        }
        else{
            res.status(400).json({message:"Credentials are incorrect"})
        }


    }
const homeData=async(req,res)=>{
    console.log("home is here")
    res.status(200).json({message:"Home welcome"})

}

module.exports={registerData,loginUserData,homeData}

    


