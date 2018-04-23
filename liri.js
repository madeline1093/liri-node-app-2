require("dotenv").config();
let request = require("request");
let Spotify = require('node-spotify-api');
let Twitter = require('twitter');
let fs = require("fs");
let keys = require("./keys");
//let express = resquire("express");

//let spotify = new Spotify(keys.spotify);
//let client = new Twitter(keys.twitter);

let input = process.argv[2];



// if input is equal to my-tweets, call the twitter api and consolelog past 20 tweets
// else if 

if (input === "my-tweets") {
    pastTweets();
} else if ((input === 'spotify-this-song')){
    spotifySong();
} else if (input === 'movie-this') {
    movieSearch();
} else if (input === 'do-what-it-says') {
    whatItSays();
}


//events

//past tweets

function pastTweets() {
    //let queryURL =  'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=20';

    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret,
    }); 

    let params = {screen_name: 'maddylionrawr', count: 20}
    client.get("statuses/user_timeline/", params, function(error, tweets, response){
        if (!error) {
            for (let i = 0; i < tweets.length; i++){
                console.log("Maddy tweeted: " + tweets[i].text + " on " + tweets[i].created_at);  
            }

        }

    })
}

function spotifySong(){
    
    let songTitle = process.argv[3];
    
    if(!songTitle){
        songTitle = "the sign ace of base"
    }

    let spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret,
    })
    spotify.search({type: 'track', query: songTitle}, function(err, data) {
        if (err) {
            return console.log('Error occured: ' + err);
        } else {
            let songName = data.tracks.items[0].name;
            let songArtist = data.tracks.items[0].artists[0].name;
            let songAlbum = data.tracks.items[0].album.name;
            let songURL = data.tracks.items[0].external_urls.spotify;
            console.log("Here is the song information you requested:");
            console.log("Song title: " + songName + "\n" + "Artist: " + songArtist + "\n" + "Album: " + songAlbum + "\n" + "Spotify link: " +songURL);
        };
    });
};

function movieSearch() {
    let movieName = process.argv[3];
    if (!movieName) {
        movieName = "Mr. Nobody";
    }
    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    //console.log('this is working')

    
    request(queryUrl, function(error, response, body) {
        //  console.log(body);
// If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        //console.log(JSON.parse(body))
       
        console.log(JSON.parse(body).Title)

        console.log("This movie's title is: " + JSON.parse(body).Title + "\nThe year the movie came out is: " + JSON.parse(body).Year  + "\nThe movie's IMDB rating is: " + JSON.parse(body).imdbRating + "\nThe movie's Rotten Tomatoes Rating is: " + JSON.parse(body).Ratings[1].Value + "\nCountry where the movie was produced: " + JSON.parse(body).Country + "\nLanguage(s): " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors/Actresses: " + JSON.parse(body).Actors);
      }
    });
}

function whatItSays() {

}