import mongoose from "mongoose";
import validate from "validator";
import bcrypt from "bcrypt";
import { signRefreshToken, signVerifyToken } from "../utils/jwt.service.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [50, "Username cannot exceed 20 characters"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: [validate.isEmail, "Email is invalid"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
        maxLength: [30, "Password cannot exceed 30 characters"],
    },
    role: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin", "super admin"],
            message: "Role is not supported",
        },
    },
    refreshToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String,
    }
}, {
    timestamps: true,
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.refreshToken = signRefreshToken(this._id);
    this.verifyToken = signVerifyToken(this.email);
    next();
})

export default new mongoose.model("User", userSchema);
