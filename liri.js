require("dotenv").config();
var request = require("request");
let Spotify = require('node-spotify-api');
let Twitter = require('twitter');
let fs = require("fs");
var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

let input = process.argv[2];


// if input is equal to my-tweets, call the twitter api and consolelog past 20 tweets
// else if 

if (input === "my-tweets") {
    pastTweets();
}


//events

//past tweets

function pastTweets() {
    let queryURL = 'https://api.twitter.com/1.1/statuses/user_timeline.json?maddylionrawr=twitterapi&count=20';

    var client = new Twitter({
        consumer_key: keys.twitter.consumer_key,
        consumer_secret: keys.twitter.consumer_secret,
        access_token_key: keys.twitter.access_token_key,
        access_token_secret: keys.twitter.access_token_secret,
    }); 


}