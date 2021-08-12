const route = require("express").Router();
const { SignUp, Login, forgotPassword, updatePassword, updateUserInfo, TokenDecoder, getUserDetails } = require('../Functions/userInfo');
const chalk = require("chalk");

route.post("/login", async (req, res) => {
    try {
        const password = req.headers.password;
        const email = req.headers.email;
        const token = await Login(email, password);
        res.status(200).set("Authorization", "Bearer " + token).send().end();
    } catch (e) {
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});

route.post("/signup", async (req, res) => {
    try {
        const { email, password, FirstName, LastName } = await req.body;
        await SignUp(email, password, FirstName, LastName);
        res.status(200).json({ message: "user has been created" });
    } catch (e) {
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});

route.post("/forgotpass/:email", async (req, res) => {
    try {
        const email = req.params.email;
        await forgotPassword(email);
        res.status(200).json({ message: "code was sent to your email" });
    } catch (e) {
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});

route.post("/updatePass", async (req, res) => {
    try {
        const token = req.headers.authorization
        await updatePassword(token);
        res.status(200).json({ message: "password changed successfully" });
    } catch (e) {
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});

route.post("/updateEmail/:email/:firstname/:lastname", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { email, firstname, lastname } = req.params;
        let newToken = await updateUserInfo(email, token, firstname, lastname);
        res.status(200).set("Authorization", "Bearer " + newToken).json({ message: 'successful' });
    } catch (e) {
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});

route.get("/userinfo", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const userDetails = getUserDetails(token);
        res.status(200).json(userDetails);
    } catch (e) {
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});

module.exports = route;