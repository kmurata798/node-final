const Post = require('../models/post');
const post = require('../models/post');

module.exports = (app) => {
    // INDEX
    app.get('/', (req, res) => {
        Post.find({}).lean()
            .then(posts => {
                res.render("posts-index", { posts });
            })
            .catch(err => {
                console.log(err.message);
            });
    })
    // CREATE NEW POST [GET]
    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    })
    // CREATE NEW POST [POST]
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
        })
    });

    // SINGLE POST [GET]
    app.get('/posts/:id', function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').lean()
            .then((post) => {
                res.render('posts-show', { post })
            })
            .catch((err) => {
                console.log(err.message)
            })
    });

    // CATEGORY SHOW [GET]
    app.get("/n/:category", function(req, res) {
        Post.find({ category: req.params.category }).lean()
            .then(posts => {
                res.render("posts-index", { posts });
            })
            .catch(err => {
                console.log(err);
            });
    });
};