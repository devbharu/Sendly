import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import textRoutes from "./routes/textRoutes.js";
import connectDB from "./utils/ConnectDB.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


connectDB();


app.use(cors());
app.use(express.json());


app.use("/api", textRoutes);

const distPath = path.join(__dirname, "./dist");
app.use(express.static(distPath));


app.get("/", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err) {
            res.status(500).send("Error loading index.html. Ensure 'dist' folder exists.");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));