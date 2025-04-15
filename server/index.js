const express = require('express')
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
const { readdirSync} = require("fs")
const { connect } = require('http2')
const { connectDb } = require('./db/connection')

const port = process.env.PORT || 5000


//handling connections errors
app.use(cors({origin: process.env.CLIENT_URL}));
app.use(express.json())

connectDb()

app.get("/", (req,res) =>{
    res.send("<center><h1>Server Running</h1></center>")
})


//dynamic routes
readdirSync("./routes").map((route) => 
    app.use("/api",require(`./routes/${route}`))
)


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    
})