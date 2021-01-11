const express = require('express');
const hbs=require('hbs');
const path=require('path');
const request = require('request');

const viewsPath=path.join(__dirname,'views');
const partialPath=path.join(__dirname,'views/partials');

const app = express();
// app.set('view engine', 'ejs');

app.set('viewengine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

// Modification view engine
app.set('view engine', 'hbs');


// Search Route "/"
app.get('/', function(req, res){
    res.render('search', {
        layout : 'layouts/index',
        title: 'Request Movie Page',
    });
});

// Result Route "/"
app.get('/results', function(req, res){
    let query = req.query.search;
    let url = 'https://www.omdbapi.com/?apikey=6c0d5126&s=' + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode === 200){
            let data = JSON.parse(body)
            res.render('results', {
                layout : 'layouts/index',
                title: 'Results Movies Page',
                movies: data,
            });
        }
    });
});

 app.listen(3000, function(){
     console.log('Movie app started on port: 3000');
 });
