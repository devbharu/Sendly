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


const distPath = path.resolve(__dirname, "dist");
app.use(express.static(distPath));


app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"), (err) => {
        if (err) {

            console.error("Error finding index.html at:", path.join(distPath, "index.html"));
            res.status(500).send("Frontend build not found.");
        }
    });
});


export default app;


if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}