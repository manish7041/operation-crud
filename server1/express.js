const express = require("express")
const app = express();
const mongoose = require("mongoose");
const router = require("./route")
const env = require("dotenv")
var cors = require('cors')


app.use(cors())
env.config();
app.use(express.json());
app.use("/user",router);


mongoose.connect(process.env.DB_URL)
.then(()=>{
   
    console.log("connection to DB successfull");
    app.listen(5000,console.log('listen to port 5000'))
})
.catch((err)=>{
    console.log(`there will be some problem ${err}`);
})

