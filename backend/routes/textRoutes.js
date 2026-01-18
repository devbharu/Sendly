import { Router } from "express";
import bcrypt from "bcrypt";
import OtpModel from "../models/Otp.model.js";
import { randomNumber } from "../utils/otpGenerator.js";
const router = Router();



router.post("/addText", async (req, res) => {
    try {
        const { text } = req.body;
        const otp = randomNumber().toString();

        await OtpModel.create({
            text,
            otp,
            expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000)
        });

        res.json({ message: "OTP sent", otp });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


router.post("/otp", async (req, res) => {
    try {
        const { otp } = req.body;


        const record = await OtpModel.findOne({
            otp: otp,
            expiresAt: { $gt: new Date() }
        });

        if (!record) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        res.json({ success: true, text: record.text });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
export default router;
