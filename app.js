const express = require('express');
const exphbs = require('express-handlebars');
const request = require('request');

const app = express();
// app.set('view engine', 'ejs');


app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    registerPartials: './partials',
    helpers: {
        block: function (name) {
            var blocks = this._blocks;
            content = blocks && blocks[name];
            return content ? content.join('\n') : null;
        },
        contentFor: function (name, options) {
            var blocks = this._blocks || (this._blocks = {});
            block = blocks[name] || (blocks[name] = []);
            block.push(options.fn(this));
        }
    }
}));

app.set('view engine', 'hbs');


app.get('/', function(req, res){
    res.render('search', {
        layout : 'index',
        title: 'Request Movie Page',
    });
});

app.get('/results', function(req, res){
    let query = req.query.search;
    let url = 'https://www.omdbapi.com/?apikey=6c0d5126&s=' + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200){
            let data = JSON.parse(body)
            res.render('results', {
                layout : 'index',
                title: 'Results Movies Page',
                movies: data,
            });
        }
    });
});

 app.listen(3000, function(){
     console.log('Movie app started on port: 3000');
 });
