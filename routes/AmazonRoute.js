const route = require("express").Router();
const amazonScraper = require('amazon-buddy');
const chalk = require("chalk");


route.post("/search", async (req, res) => {
    try {
        console.log("AMAZON");
        console.log(req.body.searchString);
        // let { searchParam, country } = await req.body;
        let searchParam = req.body.searchString
        let country = "CA"

        const products = await amazonScraper.products({ keyword: searchParam, country: country ? country : "CA" }); //default country is Canada
        res.status(200).json({result:products.result});
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