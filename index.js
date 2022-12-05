require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require('body-parser');
let URL_COUNT = 0;
let URL_MAP = {};
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));


app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
//post request

app.post('/api/shorturl', function(req,res) {
    const regex = /https?:\/\//;
    if (req.body.url.match(regex)){
        res.json({original_url: req.body.url, short_url: URL_COUNT});
        URL_MAP[URL_COUNT] = req.body.url
        URL_COUNT+=1;    
    }
    else{
        res.json({error: 'invalid url'})
    }
    
})

app.get('/api/shorturl/:i', function(req,res){
    res.redirect(URL_MAP[req.params.i])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
