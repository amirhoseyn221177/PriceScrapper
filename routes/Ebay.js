const route = require("express").Router();
const chalk = require("chalk");
const { EbayResult } = require("../Functions/StoreAPIs");

route.post("/search", async (req, res) => {
    try {
        let { searchText, startPoint, sortVariable } = await req.body;
        const respond = await EbayResult(searchText, startPoint, sortVariable);
        res.status(200).json(respond);
    } catch (e) {
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});

module.exports = route;