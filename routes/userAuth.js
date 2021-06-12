const route = require("express").Router();
const { SignUp, Login } = require('../Functions/userInfo');
const chalk = require("chalk");
const { json } = require("express");



route.post("/login", async (req, res) => {
    try {

        console.log(req.headers.password)
        const password = req.headers.password;
        const email = req.headers.email;
        const token = await Login(email,password)
        console.log(token)
        res.status(200).set("Authorization",token).send().end()
    } catch (e) {
        console.log(chalk.red(e.message))
        res.status(500).send({
            error:{
                message:e.message
            }
        })
    }

});


route.get("/signup", async (req, res) => {
    try {
        const { email, password, FirstName, LastName } = await req.body;
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



module.exports = route;