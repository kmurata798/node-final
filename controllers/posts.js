const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {
    // INDEX
    app.get('/', (req, res) => {
        var currentUser = req.user;
        console.log(req.cookies);
      
        // Post.find({})
        Post.find().populate('author').lean()
            .then(posts => {
                res.render('posts-index', { posts, currentUser });
            })
            .catch(err => {
                console.log(err.message);
            });
    });
    // CREATE NEW POST [GET]
    app.get('/posts/new', (req, res) => {
        var currentUser = req.user;
        if (req.user) {
            res.render('posts-new', currentUser);
        } else {
            res.redirect('/');
        }
    })
    // CREATE
    app.post("/posts/new", (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
            post.author = req.user._id;

            post
                .save()
                .then(post => {
                    return User.findById(req.user._id);
                })
                .then(user => {
                    user.posts.unshift(post);
                    user.save();
                    // REDIRECT TO THE NEW POST
                    res.redirect(`/posts/${post._id}`);
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // SINGLE POST [GET]
    app.get('/posts/:id', function(req, res) {
        // ALLOW ROUTE TO IDENTIFY USER
        var currentUser = req.user;
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').lean()
            .then((post) => {
                res.render('posts-show', { post, currentUser })
            })
            .catch((err) => {
                console.log(err.message)
            })
    });

    // CATEGORY SHOW [GET]
    app.get("/n/:category", function(req, res) {
        var currentUser = req.user;
        Post.find({ category: req.params.category }).lean()
            .then(posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err);
            });
    });
};