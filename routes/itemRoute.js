const route = require("express").Router();
const { User, Review, Rating, mostPopularItems } = require("../Mongoose/models");
const { TokenDecoder, getRecentViewdItems, getWishListItems, addTorecentViews, addToWishList, authenticate } = require("../Functions/userInfo");
const chalk = require("chalk");
const { findTheReviews } = require("../Functions/StoreAPIs");



const verifyToken = async (req, res, next) => {
    try {
        console.log(req.headers['authorization'])
        authenticate(req.headers['authorization'])
        console.log("verified")
        next();
    } catch (e) {
        console.log(chalk.red(e.message));
        res.status(403).send({
            error: {
                message: e.message
            }
        })
    }
}


route.get('/getRecentlyViewed', async (req, res) => {
    console.log(req.headers.authorization);
    try {
        let token = req.headers.authorization;
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

route.post('/getRating', async (req, res) => {
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
        .catch(err => res.status(400).json('Error: ' + err))
});

route.get('/getRating/:title', async (req, res) => {
    try {
        const ratings = await Rating.find();
        var sum = 0;
        var j = 0; 
        for(let i = 0; i < ratings.length; i++){
            if(ratings[i].title === req.params.title){
                sum = sum + parseInt(ratings[i].rating, 10);
                j = j + 1;
            }
        }
            res.json((sum / (j + 1)).toFixed(2))
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

    newReview.save()
        .then(() => res.json('Review Added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

route.get('/getReviews', async (req, res) => {
    Review.find()
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

route.delete('/getReviews/:id', async (req, res) => {
    Review.find()
        .then(review => res.json(review))
        .catch(err => res.status(400).json('Error: ' + err));
});

route.post('/sendReviews', async (req, res) => {
    try{

        var itemURL = req.body.itemURL;
        var title = req.body.title;
        var FirstName = req.body.FirstName;
        var LastName = req.body.LastName;
        var review = req.body.review;
        console.log(review)
        var newReview = new Review({
            itemURL,
            title,
            FirstName,
            LastName,
            review
        });
        await newReview.save()
        res.json({message : "message has been added"})
    }catch(e){
        console.log(chalk.red(e.message));
        res.status(500).send({
            error: {
                message: e.message
            }
        });
    }

});

route.post('/getReviews', async (req, res) => {
    try{
        console.log(req.body.itemURL)
        const itemURl = await req.body.itemURL
        let reviews = await findTheReviews(itemURl)
        res.status(200).json(reviews)
    }catch(e){
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


route.post("/addToRecent", async (req, res) => {
    try {
        let token = req.headers.authorization
        let { item } = await req.body;
        await addTorecentViews(token, item);
        res.status(200).json({ message: "item added to recentViews" });
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
        let token = req.headers.authorization
        let { item } = await req.body;
        await addToWishList(token, item);
        res.status(200).json({ message: "item added to the wish list" });
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
