require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var Omdb = require('omdb');
var request = require('request');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var omdb = keys.omdb.api_key;
var liriCommand = process.argv[2];
var spotifySong;
var movieName;

//Search phrase to contain all arguments after argv[3] for multi-word searches.
var searchPhrase = '';
for (var i = 3; i < process.argv.length; i++) {
    if (i > 3 && i < process.argv.length) {
        searchPhrase = searchPhrase + "+" + process.argv[i];
    }
    else {
        searchPhrase += process.argv[i];
    }
}

//ID of default spotify song "The Sign" by Ace of Base (in case user does not provide a search phrase)
var defaultSpotifyID = '0hrBpAOgrt8RXigk83LLNE';

//Default moie "Mr. Nobody" (in case user does not provide a search phrase)
var defaultMovie = 'Mr. Nobody';

function runLiri() {
    if (liriCommand === "my-tweets") {
        runTwitter();
    }
    else if (liriCommand === "spotify-this-song") {
        runSpotify();
    }
    else if (liriCommand === "movie-this") {
        runOmdb();
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

    spotifySong = searchPhrase;
    console.log('Spotify Song: ' + spotifySong);
    //if no song is provided
    if (process.argv[3] === undefined) {
        //output "The Sign" by Ace of Base
        spotify
            .request('https://api.spotify.com/v1/tracks/' + defaultSpotifyID)
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

    movieName = searchPhrase;
    if (process.argv[3] === undefined) {
        var queryURL = "http://www.omdbapi.com/?t=" + defaultMovie + "&y=&plot=short&apikey=" + omdb;
        request(queryURL, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                // Parse the body of the site and recover needed details
                console.log('==================');
                console.log("You provided no movie to search. Here's the default result.");
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
    else {
        console.log('Movie Name:' + movieName);
        var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdb;
        request(queryURL, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                // Parse the body of the site and recover needed details
                console.log('==================');
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
}

function runRandom() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Split data by newslines
        var dataArr = data.split("\n");

        // pick a random line item from the array
        var randomItem = dataArr[Math.floor(Math.random() * dataArr.length)];

        // get command of the random line item (split by 1st comma in case there are multiple commas)
        liriCommand = randomItem.split(/,(.+)?/)[0];
        console.log('liri command: ' + liriCommand);

        // get search phrase of the random line item (split by 1st comma in case there are multiple commas)
        searchPhrase = randomItem.split(/,(.+)?/)[1];
        console.log('search phrase: ' + searchPhrase);

        // set argv[3] to the search phrase so if/else logic still works correctly.
        process.argv[3] = searchPhrase;

        runLiri();
    });
}