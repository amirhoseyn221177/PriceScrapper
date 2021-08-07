const route = require("express").Router();
const { SignUp, Login, forgotPassword, updatePassword, updateUserInfo, TokenDecoder, getUserDetails } = require('../Functions/userInfo');
const chalk = require("chalk");



route.post("/login", async (req, res) => {
    try {

        const password = req.headers.password;
        const email = req.headers.email;
        const token = await Login(email, password);
        res.status(200).set("Authorization", "Bearer "+token).send().end();
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


route.post("/updateEmail/:email/:firstname/:lastname", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { email, firstname, lastname } = req.params;
        let newToken = await updateUserInfo(email, token, firstname, lastname);
        res.status(200).set("Authorization", "Bearer "+newToken).json({ message: 'successful' });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});


route.get("/userinfo",async(req,res)=>{
    try{
        const token = req.headers.authorization
        const userDetails = getUserDetails(token)
        res.status(200).json(userDetails)
    }catch(e){
        console.log(e.message);
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
})



module.exports = route;