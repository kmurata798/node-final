const express = require('express')
const app = express()
const port = 3000

// MIDDLEWARE
var exphbs = require('express-handlebars');

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('posts-index', { msg: 'Handlebars are Cool!' });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))