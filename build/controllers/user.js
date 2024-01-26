"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const index_1 = __importDefault(require("../models/index"));
const bcrypt_1 = require("bcrypt");
const User = index_1.default.users;
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (!users || users.lenght == 0)
            return res.status(500).send({ msg: "Users not found" });
        return res.status(200).send({
            msg: "Users found!",
            payload: users,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).send({ msg: "Missing details!" });
        const user = await User.findOne({ where: { id: id } });
        if (!user)
            return res.status(404).send({ msg: "user not found!" });
        return res.status(200).send({ msg: "User Found!", payload: user });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password)
            return res.status(400).send({ msg: "Missing details" });
        const user = await User.findOne({ where: { email: email } });
        if (user)
            return res.status(400).send({ msg: "User already exists!" });
        const salt = await (0, bcrypt_1.genSalt)(10);
        const passwordHash = await (0, bcrypt_1.hash)(password, salt);
        const createdUser = await User.create({
            email: email,
            username: username,
            password: passwordHash,
        });
        if (!exports.createUser)
            return res.status(500).send({ msg: "Something went wrong" });
        return res.status(201).send({ msg: "User Created", payload: createdUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id || !data)
            return res.status(400).send({ msg: "Missing details" });
        const user = await User.findOne({ where: { id: id } });
        if (!user)
            return res.status(400).send({ msg: "User not found" });
        for (const ops of data) {
            user[ops.propName] = ops.value;
        }
        const action = await user.save();
        if (!action)
            return res.status(500).send({ msg: "Something went wrong" });
        return res.status(200).send({ msg: "User updated!", payload: user });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return res.status(400).send({ msg: "Missing details!" });
        const user = await User.destroy({ where: { id: id } });
        if (!user)
            return res.status(400).send({ msg: "user not found" });
        return res.status(200).send({ msg: "User deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
exports.deleteUser = deleteUser;
