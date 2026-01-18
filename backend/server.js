import express from "express";
import mongoose from "mongoose";
import textRoutes from "./routes/textRoutes.js"
import cors from "cors"
import connectDB from "./utils/ConnectDB.js"

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", textRoutes)


app.listen(3000, () => console.log("Server running on port 3000"));
