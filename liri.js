require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var OMDBKey = keys.omdb;

var liriCommand = process.argv[2];

function runLiri() {
    if (liriCommand === "my-tweets") {
        twitter();
    }
    else if (liriCommand === "spotify-this-song") {
        var spotifySong = process.argv[3];
        spotify();
    }
    else if (liriCommand === "movie-this") {
        omdb();
    }
    else if (liriCommand === "do-what-it-says") {
        random();
    }
    else {
        console.log("invalid command");
        return;
    }
}

runLiri();

function twitter() {
    client.get('statuses/home_timeline', function(error, tweets, response) {
        console.log('Here are your last 20 tweets');
        console.log('============================');      
        for (var i = 0; i<tweets.length; i++){
            console.log(i+1 + '. ' + tweets[i].text);
        }
     });
}

function spotify() {

}

function omdb() {

}

function random() {

}