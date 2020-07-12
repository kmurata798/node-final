const express = require('express')
const app = express()
const port = 3000

// MIDDLEWARE
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var exphbs = require('express-handlebars');

// ACCESSING POST REQUESTS
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());

// TEMPLATE ENGINE
// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// Set db
require('./data/cartoon-db');
// CONTROLLERS
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app;