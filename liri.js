require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var Omdb = require('omdb');
var request = require('request');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = keys.omdb.api_key;
var liriCommand = process.argv[2];
var searchPhrase = "";
for (var i = 3; i < process.argv.length; i++) {

    if (i > 3 && i < process.argv.length) {
  
        searchPhrase = searchPhrase + "+" + process.argv[i];
  
    }
  
    else {
  
        searchPhrase += process.argv[i];
  
    }
  }


function runLiri() {
    if (liriCommand === "my-tweets") {
        runTwitter();
    }
    else if (liriCommand === "spotify-this-song") {
        runSpotify();
    }
    else if (liriCommand === "movie-this") {
        runOmdb();
        console.log('must run runOmdb');
    }
    else if (liriCommand === "do-what-it-says") {
        runRandom();
    }
    else {
        console.log("Invalid command. Try 'my-tweets','spotify-this-song','movie-this', or 'do-what-it-says'.");
        return;
    }
}

runLiri();

function runTwitter() {
    client.get('statuses/home_timeline', function (error, tweets, response) {
        console.log('==================');
        console.log('Here are 20 tweets');
        console.log('==================');
        //display 20 latest tweets
        for (var i = 0; i < 20; i++) {
            console.log(i + 1 + ') TEXT: ' + tweets[i].text + '\n    DATE: ' + tweets[i].created_at);
        }
    });
}

function runSpotify() {
    // var spotifySong = process.argv[3];
    var spotifySong = searchPhrase;
    //if no song is provided
    if (spotifySong === undefined) {
        //output "The Sign" by Ace of Base
        spotify
            .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function (data) {
                console.log('==================');
                console.log("You provided no song to search. Here's the default result.");
                console.log('ARTIST: ' + data.artists[0].name);
                console.log('SONG: ' + data.name);
                console.log('PREVIEW URL: ' + data.preview_url);
                console.log('ALBUM: ' + data.album.name);
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
        return;
    }
    //if song name is provided
    else {
        spotify.search({ type: 'track', query: spotifySong }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //if response is empty
            else if (data.tracks.items.length === 0) {
                console.log('==================');
                console.log('Sorry, that song is not found. Please search again.')
            }
            //normal response - get all tracks if there are multiple with the same name.
            else {
                for (var i = 0; i < data.tracks.items.length; i++) {
                    console.log('\n========= ( ' + i + ' ) =========');
                    console.log('ARTIST: ' + data.tracks.items[i].album.artists[0].name);
                    console.log('SONG: ' + data.tracks.items[i].name);
                    console.log('PREVIEW URL: ' + data.tracks.items[i].preview_url);
                    console.log('ALBUM: ' + data.tracks.items[i].album.name);
                }
            }
        });
    }
}

function runOmdb() {
    var movieName = searchPhrase;
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdb;
    request(queryURL, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

function random() {

}