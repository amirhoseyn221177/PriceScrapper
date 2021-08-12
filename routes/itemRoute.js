const route = require("express").Router();
const {
    User,
    Review,
    Rating,
    mostPopularItems
} = require("../Mongoose/models");
const {
    TokenDecoder,
    getRecentViewdItems,
    getWishListItems,
    addTorecentViews,
    addToWishList,
    authenticate
} = require("../Functions/userInfo");
const chalk = require("chalk");
const {
    findTheReviews
} = require("../Functions/StoreAPIs");



const verifyToken = async (req, res, next) => {
    try {
        authenticate(req.headers['authorization']);
        next();
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(403).send({
            error: {
                message: e.message
            }
        });
    }
};


route.get('/getRecentlyViewed', async (req, res) => {
    try {
        let token = req.headers.authorization;
        const items = await getRecentViewdItems(token);
        res.status(200).json({
            items
        });
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });

    }

});

route.post('/sendRating', async (req, res) => {
    var itemURL = req.body.itemURL;
    var title = req.body.title;
    var FirstName = req.body.FirstName;
    var rating = req.body.rating;
    var newRating = new Rating({
        itemURL,
        title,
        FirstName,
        rating
    });
    newRating.save()
        .then(() => res.json('Rating Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

route.post('/getRating', async (req, res) => {
    var sum = 0;
    try {

        const ratings = await Rating.find({
            title: req.body.title
        });
        for (let i = 0; i < ratings.length; i++) {
            sum = sum + ratings[i].rating;
        }
        if (ratings.length > 0) res.json((sum / ratings.length).toFixed(2));
        else res.json(NaN);
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });

    }
});


route.post('/sendReviews', async (req, res) => {
    try {

        var itemURL = req.body.itemURL;
        var title = req.body.title;
        var FirstName = req.body.FirstName;
        var LastName = req.body.LastName;
        var review = req.body.review;
        var newReview = new Review({
            itemURL,
            title,
            FirstName,
            LastName,
            review
        });
        await newReview.save();
        res.json({
            message: "message has been added"
        });
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }

});

route.post('/getReviews', async (req, res) => {
    try {
        const itemURl = await req.body.itemURL;
        let reviews = await findTheReviews(itemURl);
        res.status(200).json(reviews);
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });

    }
});

route.delete('/getReviews/:id', async (req, res) => {
    Review.find()
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

route.get("/getWishList", async (req, res) => {
    try {
        let token = req.headers.authorization;
        let items = await getWishListItems(token);
        res.status(200).json({
            items
        });
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});


route.post("/addToRecent", async (req, res) => {
    try {
        let token = req.headers.authorization;
        let {
            item
        } = await req.body;
        await addTorecentViews(token, item);
        res.status(200).json({
            message: "item added to recentViews"
        });
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
    try {
        let token = req.headers.authorization;
        let {
            item
        } = await req.body;
        await addToWishList(token, item);
        res.status(200).json({
            message: "item added to the wish list"
        });
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }
});

module.exports = {
    route,
    verifyToken
};