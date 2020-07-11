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
    app.get('/posts/:id', function(req, res) {
        Post.findById(req.params.id).lean()
            .then(post => {
                res.render('posts-show', { post });
            })
            .catch(err => {
                console.log(err.message);
            });
    });
};