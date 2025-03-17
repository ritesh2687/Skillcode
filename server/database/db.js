import mongoose from "mongoose";
import dotenv from "dotenv"
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
            console.log('MongoDB Connected');
        } catch (error){
            console.log("errro occured", error);
            
        }
    }
export default connectDB;