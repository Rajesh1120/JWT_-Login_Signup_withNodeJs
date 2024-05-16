const mongoose=require("mongoose");

const dbConnection=async()=>{
    try{
        const connect =await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("DataBase connected:",connect.connection.host,connect.connection.name)
    }
    catch(err){
        console.log(err);
    }
}

module.exports=dbConnection
