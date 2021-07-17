const route = require("express").Router();
const { User, mostPopularItems } = require("../Mongoose/models");
const { getRecentViewdItems, getWishListItems, addTorecentViews, addToWishList } = require("../Functions/userInfo");

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


    route.post('addtorecent', async (req, res) => {
        try {
            let { token, itemObject } = await req.body;
            await addTorecentViews(token, itemObject);
            res.status.json({message : "item added to recentViews"})
        } catch (e) {
            console.log(chalk.red(e.message));
            res.status(500).send({
                error: {
                    message: e.message
                }
            });

        }

    });


    route.post('/addtowishlist',async(req,res)=>{
        try{
            let { token, itemObject } = await req.body;
            await addToWishList(token, itemObject)
            res.status(200).json({message : "item added to the wish list"})
        }catch(e){
            console.log(chalk.red(e.message));
            res.status(500).send({
                error: {
                    message: e.message
                }
            });
        }
    })
});