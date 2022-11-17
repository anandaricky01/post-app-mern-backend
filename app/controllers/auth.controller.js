import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateAccessToken } from "../helpers/generateAccessToken.helper.js";

export const register = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        password : password
    });
    try {
        const createdUser = await user.save();
        const token = generateAccessToken({
            name : req.body.name,
            email : req.body.email,
        });

        return res.status(201).json({
            message : "User has been created!",
            data : createdUser,
            accessToken : token
        })
    } catch (error) {
        return res.status(400).json({message : error.message});
    }
}

export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const checkUser = await User.findOne({email : email});
        if(!checkUser) return res.json({ message : "Email or Password is incorrect!"});
    
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if(checkPassword == false) return res.json({ message : "Email or Password is incorrect!"});
    
        const payload = {
            name : checkUser.name,
            email : checkUser.email,
        };
        
        const token = generateAccessToken(payload);

        return res.json({accessToken : token});
    } catch (error) {
        return res.status(400).json({message : error.message});
    }



}