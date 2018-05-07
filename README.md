# Liri (Node.js App)

## How it works
Liri can take in one of the following commands:

1. `my-tweets`
 - This will show the last 20 tweets of the Twitter API Key owner's account and when they were created at in the terminal/bash window. 
 - You will need to create a Twitter app and obtain the consumer_key, consumer_secret, access_token_key & access_token_secret. 
2. `spotify-this-song` + name of the song
 - This will show the following information about the song in the terminal/bash window:
     - Artist(s)
     - The song's name
     - A preview link of the song from Spotify
     - The album that the song is from
     - If no song is provided then a default song will be shown: "The Sign" by Ace of Base.
 - You will need to create a Spotify app and obtain the spotify id and secret keys.
3. `movie-this` + name of the movie
 - This will output the following information in the terminal/bash window:
     - Title of the movie.
     - Year the movie came out.
     - IMDB Rating of the movie.
     - Rotten Tomatoes Rating of the movie.
     - Country where the movie was produced.
     - Language of the movie.
     - Plot of the movie.
     - Actors in the movie.
     - If no movie is provided then a default movie will be shown: "Mr. Nobody".
 - You will need an OMDB API Key.
4. `do-what-it-says`
 - This will take a line of text inside of random.txt and then use it to call one of LIRI's commands.
 - Text inside random.txt must be properly structured for this to work:
     - `liriCommand,searchTerm` - for example, `movie-this,"Me, Myself and Irene"` or `my-tweets`. There must be a comma and no space between the command and the search term.
     - Each `liriCommand,searchTerm` pair (or only `liriCommand`) must be entered as new lines.

## Node Packages/Dependencies:
1. "dotenv": "^5.0.1",
2. "node-spotify-api": "^1.0.7",
3. "omdb": "^0.8.0",
4. "request": "^2.85.0",
5. "spotify": "^0.3.0",
6. "twitter": "^1.7.1"

Please use package.json or install these packages individually

## Why this project?
This app helps beginners with understanding and working with various commonly used APIs using Node and npm packages.

## Get started
To get started with this project, do one of the following:

1. Using git from command line, `git clone git@github.com:geochanto/liri-node-app.git` 
2. Download the zip archive: https://github.com/geochanto/liri-node-app/archive/master.zip
3. Create a fork at https://github.com/geochanto/liri-node-app
4. Create a .env file locally
4. Make sure to obtain your own Spotify, Twitter & OMDB API keys and add them to your .env file

## Improve Liri
Add your own spin to this app:

1. Make the logic more DRY. Abstract away some of the repeated functions.
2. Add more commands and/or APIs
3. Use `inquirer` or `prompt` packages to get user input

## Contributors
##### George Chanturidze
##### https://github.com/geochanto/