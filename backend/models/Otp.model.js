import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        otp: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);


otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpModel = mongoose.model("Otp", otpSchema);

export default OtpModel;
