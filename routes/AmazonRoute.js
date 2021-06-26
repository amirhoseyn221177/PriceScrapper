const route = require("express").Router();
const chalk = require("chalk");
const { AmazonResult } = require("../Functions/StoreAPIs");


route.post("/search", async (req, res) => {
    try {
        let searchParam = req.body.searchText
        let country = req.body.country ? req.body.country : "CA"
        let startPoint = req.body.startPoint

        const products = await AmazonResult(searchParam,country,startPoint)
        res.status(200).json(products);
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