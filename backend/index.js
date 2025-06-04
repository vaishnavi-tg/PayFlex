import app from "./app.js"
import {config} from "dotenv"
import connectToDB from "./db/index.js"
import cors from "cors"
import express from "express" 

config()
app.use(cors())
app.use(express.json())


try {
    app.listen(process.env.PORT,()=>{
        connectToDB()
        console.log(`App listening on port ${process.env.PORT}`);
    })
} catch (error) {
    console.log(error)
}


