const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenUtils = require("../utils/generateToken");


exports.registerUser = async (req, res)=>{
    
    try{
        const {name, email, password} = req.body;

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                message: "User already exist!"
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            message: "User registered! ",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    }catch(error){
        res.status(500).json({
        message: "Server error"
        });
    }

};

exports.loginUser = async(req, res)=>{

    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const accessToken = tokenUtils.generateAccessToken(user);
        const refreshToken = tokenUtils.generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict", 
        });

        res.json({accessToken});

    }catch(error){
        res.status(500).json({
            message: "server error"
        });
    }

};

exports.refreshAccessToken = async(req, res)=>{
    try{
        const oldToken = req.cookies.refreshToken;

        if(!oldToken){
             return res.status(401).json({
                message: "No refresh Token"
            });
        }

        const decoded = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        
        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newRefreshToken = tokenUtils.generateRefreshToken(user);
        const newAccessToken = tokenUtils.generateAccessToken(user);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
        });

        res.json({ accessToken: newAccessToken });
    }catch (err) {
        res.status(403).json({ message: "Token invalid or expired" });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.json({ message: "Already logged out" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.clearCookie("refreshToken");

    res.json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};