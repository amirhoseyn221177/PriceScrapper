const route = require("express").Router();
const { SignUp, Login, forgotPassword, updatePassword, updateUserInfo } = require('../Functions/userInfo');
const chalk = require("chalk");



route.post("/login", async (req, res) => {
    try {

        console.log(req.headers.password);
        const password = req.headers.password;
        const email = req.headers.email;
        const token = await Login(email, password);
        console.log("line14" + token);
        res.status(200).set("Authorization", token).send().end();
    } catch (e) {
        console.log(chalk.red(e.message));
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
        console.log(email);
        await SignUp(email, password, FirstName, LastName);
        res.status(200).json({ message: "user has been created" });
    } catch (e) {
        console.log(chalk.red(e.message));
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
        console.log(email);
        await forgotPassword(email);
        res.status(200).json({ message: "code was sent to your email" });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});


route.post("/updatePass/:password/:email", async (req, res) => {
    try {
        const { password, email } = req.params;
        await updatePassword(email, password);
        res.status(200).json({ message: "password changed successfully" });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});


route.post("/updateEmail/:email/:firstname/:lastname/:password", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { email, firstname, lastname, password } = req.params;
        const newToken = await updateUserInfo(email, token, firstname, lastname, password);
        res.status(200).set("Authorization", newToken).json({ message: 'successful' });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});



module.exports = route;