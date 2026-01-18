import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB = async () => {
    try {
        console.log(process.env.DB_URL)
        await mongoose.connect(process.env.DB_URL);
        console.log("mongo connected")
    } catch (e) {
        console.log("not mongo connected")
    }
}

export default connectDB