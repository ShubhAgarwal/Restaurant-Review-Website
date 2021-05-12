const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

mongoose.set('useCreateIndex', true);

const app = express();
const port = 3000;

const Dishes = require('./models/dishes');
const Users = require('./models/users');
const Comments = require('./models/comments');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "public")));




// Connect to MongoDB

mongoose.connect("mongodb://localhost:27017/Dish_Review_Database", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', function(){
    console.log("Connected Successfully.");
}).on('error', function(error){
    console.log("Connection error: " + error);
});




// Setting Routes

app.use(express.urlencoded({
    extended: true
}));

const store = new MongoDBSession({
    uri: "mongodb://localhost:27017/Dish_Review_Database",
    collection: "sessions"
});

app.use(session({
    name: 'Sid',
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    store: store,
    cookie: {
        httpOnly: true,
        sameSite: true,
        secure: false
    }
}));


// async function asyncForEach(array, callback){
//     for(let index = 0; index < array.length; index++){
//         await callback(array[index], index, array);
//     }
// }

app.get('/', async (req, res) => {

    var {error} = req.query;
    var {userId} = req.session;
    var categories = [];

    try{
        const category = await Dishes.distinct("category");

        for(eachcategory of category){
            var c = await Dishes.findOne({category: {$eq: eachcategory}}, {category: 1, image: 1});
            categories.push(c);
        }
        res.render('home', {userId, categories, error});

    } catch(error) {
        console.log(error);
        res.render('home', {userId, categories, error});
    }

// (req, res) => {

//     var {error} = req.query;
//     var {userId} = req.session;
//     var categories = [];
    
//     Dishes.distinct("category")
//         .then((result) => {

//             // ##################
//             // const start = async() => {
//             //     await asyncForEach(result, async(cat) => {
//             //         var c = await Dishes.findOne({category: {$eq: cat}}, {category: 1, image: 1});
//             //         console.log(c);
//             //         categories.push(c);
//             //     });
//             //     console.log("DONE");
//             // }
//             // 
//             // start().then(() => {
//             //     console.log(categories);
//             //     console.log("shubham");
//             //     res.render('home', {userId, categories, error});
//             // });
//             // ##################

//             const start = async () => {
//                 for(eachcategory of result){
//                     var c = await Dishes.findOne({category: {$eq: eachcategory}}, {category: 1, image: 1});
//                     categories.push(c);
//                 }
//             }

//             start().then(() => {
//                 res.render('home', {userId, categories, error});
//             })
//             .catch((error) => {
//                 console.log(error);
//                 res.render('home', {userId, categories, error});
//             });
//         })
//         .catch((error) => {
//             console.log(error);
//             res.render('home', {userId, categories, error});
//         });

});

app.get('/menu/:category', async (req, res) => {
    
    var {error} = req.query;
    var {userId} = req.session;

    try{
        let dishes = await Dishes.find({category: {$eq: req.params.category}}, {name: 1, category: 1, image: 1});
        res.render('category', {userId, category: req.params.category, dishes, error});

    } catch(error) {
        console.log(error);
        res.render('category', {userId, category: req.params.category, dishes: [], error});
    }

});

app.get('/menu/:category/:dishes', (req, res) => {

    var {error} = req.query;
    var {userId} = req.session;

    Dishes.findOne({name: {$eq: req.params.dishes}})
        .then((result) => {
            Comments.find({dish: {$eq: result._id}}).populate('author')
                    .then((result_comment) => {
                        res.render('dish', {userId, dish: result, comments: result_comment, error});
                    })
                    .catch((error) => {
                        console.log(error);
                        res.render('dish', {userId, dish: result, comments: [], error});
                    });
        })
        .catch((error) => {
            console.log(error);
            res.render('dish', {userId, dish: {}, comments: [], error});
        });
});

app.post('/', (req, res) => {

    if(req.body.hasOwnProperty('login')){

        const {loginnum, loginpass} = req.body;

        Users.findOne({phoneno: {$eq: loginnum}, password: {$eq: loginpass}})
            .then((result) => {
                if(!result){
                    const error = {"errors": {
                                            "field": {
                                                    "name":"AuthenticationError",
                                                     "message":"INVALID Phone Number/Password"
                                                    }
                                            }
                                };
                    console.log(error);
                    return res.redirect('/?error=' + error);
                }
                else{
                    req.session.userId = result._id;
                    return res.redirect('/');
                }
            })
            .catch((error) => {
                console.log(error);
                return res.redirect(error);
            });
    }
    else if(req.body.hasOwnProperty('register') && req.body.terms){

        const {registernum, registerpass} = req.body;

        var user = new Users({
            phoneno: registernum,
            password: registerpass
        });

        user.save()
            .then((result) => {
                req.session.userId = result._id;
                return res.redirect('/');
            })
            .catch((error) => {
                console.log(error);
                console.log("shubham");
                return res.redirect("/?error=" + error);
            });
    }
    else{
        res.redirect('/');
    }

});

app.post('/menu/:category', (req, res) => {

    if(req.body.hasOwnProperty('login')){

        const {loginnum, loginpass} = req.body;

        Users.findOne({phoneno: {$eq: loginnum}, password: {$eq: loginpass}})
            .then((result) => {
                if(!result){
                    const error = {"errors": {
                                            "field": {
                                                    "name":"AuthenticationError",
                                                     "message":"INVALID Phone Number/Password"
                                                    }
                                            }
                                };
                    console.log(error);
                    return res.redirect('/menu/' + req.params.category + '?error=' + error);
                }
                else{
                    req.session.userId = result._id;
                    return res.redirect('/menu/' + req.params.category);
                }
            })
            .catch((error) => {
                console.log(error);
                return res.redirect("/menu/" + req.params.category + "?error=" + error);
            });
    }
    else if(req.body.hasOwnProperty('register') && req.body.terms){

        const {registernum, registerpass} = req.body;

        var user = new Users({
            phoneno: registernum,
            password: registerpass
        });

        user.save()
            .then((result) => {
                req.session.userId = result._id;
                return res.redirect("/menu/" + req.params.category);
            })
            .catch((error) => {
                console.log(error);
                return res.redirect("/menu/" + req.params.category + "?error=" + error);
            });
    }
    else{
        res.redirect("/menu/" + req.params.category);
    }

});

app.post('/menu/:category/:dish', async (req, res) => {

    if(req.body.hasOwnProperty('login')){

        const {loginnum, loginpass} = req.body;

        try{
            const user = await Users.findOne({phoneno: {$eq: loginnum}, password: {$eq: loginpass}});
        
            if(user){
                req.session.userId = user._id;
                return res.redirect('/menu/' + req.params.category + '/' + req.params.dish);
            }
            else{
                const error = {"errors": {
                                        "field": {
                                                "name":"AuthenticationError",
                                                "message":"INVALID Phone Number/Password"
                                                }
                                        }
                            };
                console.log(error);
                return res.redirect('/menu/' + req.params.category + '/' + req.params.dish + '?error=' + error);
            }
        } catch(error) {
            console.log(error);
            return res.redirect("/menu/" + req.params.category + "/" + req.params.dish + "?error=" + error);
        }
    }
    else if(req.body.hasOwnProperty('register') && req.body.terms){

        const {registernum, registerpass} = req.body;

        try{
            var user = new Users({
                phoneno: registernum,
                password: registerpass
            });
    
            const result = await user.save();

            req.session.userId = result._id;
            return res.redirect("/menu/" + req.params.category + "/" + req.params.dish);

        } catch(error) {
            console.log(error);
            return res.redirect("/menu/" + req.params.category + "/" + req.params.dish + "?error=" + error);
        }
    }
    else if(req.body.hasOwnProperty('comment')){

        const {userId} = req.session;
        const commentBody = req.body.comment_body;
        const commentRating = req.body.comment_rating;

        try{
            const commentDish = await Dishes.findOne({name: {$eq: req.params.dish}});

            var comment = new Comments({
                body: commentBody,
                rating: commentRating,
                author: userId,
                dish: commentDish._id
            });

            await comment.save();

            return res.redirect("/menu/" + req.params.category + "/" + req.params.dish);
        } catch(error) {
            console.log(error);
            return res.redirect("/menu/" + req.params.category + "/" + req.params.dish + "?error=" + error);
        }
    }

    res.redirect("/menu/" + req.params.category + "/" + req.params.dish);
});

app.post('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error)
            return res.redirect('/');
        
        res.clearCookie('Sid'); // SESSION_NAME is the cookie
        res.redirect('/');
    });
});




// Listening to port

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});