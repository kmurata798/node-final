const express = require('express')

const app = express()
const port = 3000
require('dotenv').config();

// MIDDLEWARE
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
var exphbs = require('express-handlebars');

// ACCESSING POST REQUESTS
// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static("public"))
// Add after body parser initialization!

// TEMPLATE ENGINE
// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// CHECKING LOGIN STATUS
var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
  
    next();
};
app.use(checkAuth);

// Set db
require('./data/cartoon-db');
// CONTROLLERS
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app;