const route = require("express").Router();
const { User, mostPopularItems } = require("../Mongoose/models");
const { TokenDecoder, getRecentViewdItems, getWishListItems, addTorecentViews, addToWishList } = require("../Functions/userInfo");
const chalk = require("chalk");

route.get('/getRecentlyViewed', async (req, res) => {
    try {
        let token = await req.body.token;
        const items = await getRecentViewdItems(token);
        res.status(200).json({ items });
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });

    }

});


route.get("/getWishList", async (req, res) => {
    try {
        let token = await req.body.token;
        let items = await getWishListItems(token);
        res.status(200).json({ items });
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
})


route.post("/addToRecent", async (req, res) => {
    try {
        let { token, itemObject } = await req.body;
        await addTorecentViews(token, itemObject);
        res.status(200).json({ message: "item added to recentViews" })
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });

    }

});


route.post("/addToWishList", async (req, res) => {
    console.log(req.body)
    try {
        let { token, itemObject } = await req.body;
        await addToWishList(token, itemObject);
        res.status(200).json({ message: "item added to the wish list" })
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