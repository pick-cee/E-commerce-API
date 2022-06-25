const User = require("../models/User");
const CryptoJS = require("crypto-js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const Register = async (request, response) => {
    if (!request.body.password) {
        response.send("Password is required, please input it");
    }
    const newUser = new User({
        username: request.body.username,
        email: request.body.email,
        password: CryptoJS.AES.encrypt(
            request.body.password,
            process.env.SECRET_KEY
        ).toString(),
    });
    try {
        const savedUser = await newUser.save();
        response.status(201).json(savedUser);
    } catch (error) {
        response.status(500).json({ error: error });
    }
};

const Login = async (request, response) => {
    try {
        const user = await User.findOne({ username: request.body.username });
        !user && response.status(401).json("Wrong Credentials");
        const hash = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        );
        const Originalpassword = hash.toString();

        !Originalpassword && response.status(401).json("Wrong Credentials");

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        response.status(200).json({
            message: "User logged in successfully",
            user: others,
            token: accessToken,
        });
    } catch (err) {
        response.status(500).json(err);
    }
};

const updateUser = async (request, response) => {
    if (request.body.password) {
        request.body.password = CryptoJS.AES.encrypt(
            request.body.password,
            process.env.SECRET_KEY
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            request.params.id,
            {
                $set: request.body,
            },
            { new: true }
        );
        response
            .status(200)
            .json({ message: "User succcessfully updated", user: updatedUser });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const deleteUser = async (request, response) => {
    try {
        await User.findOneAndDelete(request.params.id);
        response
            .status(200)
            .json({ message: "User has been deleted succesfully" });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const getUser = async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        response.status(200).json({ message: "Records.....", user: user });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const getUsers = async (request, response) => {
    try {
        const user = await User.find();
        response
            .status(200)
            .json({ message: " All Records.....", users: user });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

module.exports = {
    Register,
    Login,
    updateUser,
    deleteUser,
    getUser,
    getUsers,
};
