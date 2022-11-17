import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json({
            message : "Datas for All Users",
            data : users
        })
    } catch (error) {
        return res.statur(500).json({message : error.message});
    }
}

export const getUsersById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({
            message : "Data for User by id",
            data : user
        })
    } catch (error) {
        return res.status(404).json({message : error.message});
    }
}

export const createUser = async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        password : password
    });
    try {
        const createdUser = await user.save();
        return res.status(201).json({
            message : "User has been created!",
            data : createdUser
        })
    } catch (error) {
        return res.status(400).json({message : error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.updateOne({_id : req.params.id}, {$set : req.body});
        return res.status(200).json({
            message : "Data has been updated!",
            data : updatedUser
        })
    } catch (error) {
        return res.status(404).json({message : error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({_id : req.params.id});
        return res.status(200).json({
            message : "Data has been deleted!",
            data : deletedUser
        })
    } catch (error) {
        return res.status(404).json({message : error.message});
    }
}