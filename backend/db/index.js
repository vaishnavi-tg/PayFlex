import mongoose from "mongoose"

const connectToDB = async () => {
    try {
        const dbConnect = await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Connected To DB")
        })
    }
 
    catch (error) {
            console.log(error)
        }
    } 

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:15
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:30
    },
    lastname:{
        type:String,
        required:true,
        maxLength:30,
        trim:true
    }
})    


const User = mongoose.model("User",userSchema)

export default connectToDB
export {User}






