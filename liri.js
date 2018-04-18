require("dotenv").config();
var request = require("request");

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);