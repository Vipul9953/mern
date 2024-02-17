const express = require('express');
const dotenv = require('dotenv')
const connectDataBase = require("./config/database")
const cors = require('cors')
 
 
const app = express();
app.use(cors())

 app.use(express.json());
 dotenv.config({path:"backend/config/config.env"})


 connectDataBase();

const user = require("./routes/userRoute");
app.use(user);



app.listen(process.env.PORT, ()=>{
    console.log(`server is working on ${process.env.PORT}`);
})

