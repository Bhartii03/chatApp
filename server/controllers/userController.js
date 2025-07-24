import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";



export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePhotoUrl = "";

        if (req.file) {
        // user uploaded a file
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "profile_photos",
        });
        profilePhotoUrl = result.secure_url;
        fs.unlinkSync(req.file.path);
        } else {
        // use default boy/girl image
        const defaultImagePath = path.resolve(
            "assets",
            gender === "male" ? "boy.jpg" : "girl.jpg"
        );

        const result = await cloudinary.uploader.upload(defaultImagePath, {
            folder: "profile_photos",
            public_id: `default_${gender}_${Date.now()}`,
        });

        profilePhotoUrl = result.secure_url;
        }

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: profilePhotoUrl,
            gender
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            });
        }
        const tokenData = {
            userId: user._id,
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        });

    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req, res) => {
    try{
        return res.status(200).cookie("token","", {maxAge: 0}).json({
            message: "Logged out successfully",
        })
    }catch(error){
        console.log(error);
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}