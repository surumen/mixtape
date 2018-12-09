var express = require('express')
var app = express()

//lastfm connector:
var lastfm = require('./lastfm')

//youtube connector:
var YouTube = require('youtube-node');
var youtube = new YouTube();
youtube.setKey('AIzaSyAohCAZmsSvY4m-eKtab-3vaUfEJQjgBkA');

const PORT = process.env.PORT || 3000;

app.get('/',function(req,res){
     res.sendFile('/index.html');
});

app.get('/getTracks', function (req, res) {
    var artist = req.param('artist');
    var song = req.param('song');
    lastfm.getSimilarTracks(artist, song, function(error, response) {
        if (error) console.log(error);
        else {
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.send(response);
        }
    });
});

app.get('/youtube', function(req, res) {
    var artist = req.param('artist');
    var song = req.param('song');
    youtube.search(artist + ' ' + song, 2, function(error, response) {
        if (error) {
            console.log(error);
        }
        else {
            res.header('Access-Control-Allow-Origin', '*');
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            if (response.items.length == 0) {
                res.send('');
            }
            else res.send(response.items[0].id.videoId);
        }
    });
});

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});
