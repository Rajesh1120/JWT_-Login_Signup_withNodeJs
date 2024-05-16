const express= require('express')
const dotenv=require('dotenv').config();
const connectDB=require('./config/dbConnection')
const cors=require('cors')

const app=express();

const port=process.env.PORT || 5001
connectDB();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // if you need to handle cookies
    optionsSuccessStatus: 204
  }));
  

app.use('/api/user/',require('./routes/userRoutes'))

app.listen(port, ()=>{
    console.log(`sever started on ${port}`)
})