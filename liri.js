
//Code needed to grab information from Keys.js here.
var request = require("request");
var spotify = require('node-spotify-api');
var twitter = require('twitter');
var twitterAPI = require('node-twitter-api');
var fs = require("fs");
var keys = require("./keys");

var userInput = process.argv;

// console.log("command input: ", userInput[2]);
// console.log("user input length: ", userInput.length);


// *if* statements to determine with function to call
if (userInput[2] === "this-movie") {
	omdbs();
} else if (userInput[2] === "my-tweets") {
	twitters();
} else if (userInput[2] === "spotify-this-song") {
	spotifys();
} else if (userInput[2] === "do-what-it-says") {
	doWhatSays();
} else {
	console.log("invalid command");
}


//============================================================
// function for spotify requests
function spotifys() {
	console.log("will soon spofify the song: ", userInput[3]);


}



//============================================================
// function for OMDB requests

// OUTPUT WILL BE THE BELOW - "FIGHT CLUB" WILL BE THE DEFAULT
// * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

function omdbs() {
	// console.log("will soon call OMDB to get info on movie: ", userInput[3]);
	var movieName = "";
	
	if (userInput.length > 4) {
		for (i=3; i < userInput.length; i++){
			movieName += userInput[i] + "+";
		}
		console.log("split movie name is: ", movieName)
	} 
	if (userInput.length === 4) {
		movieName = userInput[3];
		console.log("not-split movie name is: ", movieName)
	} else {
		console.log("No movie title was provided, but here is information on Fight Club!")
		movieName = "Fight+Club";
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
	console.log(queryUrl);

	request(queryUrl, function (error, response, body){
		if (!error && response.statusCode === 200) {
			var responseBody = JSON.parse(body);

			console.log("");
			console.log("Movie title: ", responseBody.Title);
			console.log("Movie Year: ", responseBody.Year);
			console.log("IMDB Rating: ", responseBody.imdbRating);
			console.log("Rotten Tomatoes Rating: ", responseBody.rottenTomatoesRating);
			console.log("Movie's Country: ", responseBody.Country);
			console.log("Movie's Language: ", responseBody.Language);
			console.log("Movie Plot Synopsys: ", responseBody.Plot);
			console.log("Movie Actors: ", responseBody.Actors);
		}
	})
}

//============================================================
// function for twitter requests

function twitters() {
	console.log("My last 20 tweets");

	var tweets = new twitter(keys.twitterKeys);
	tweets.get('statuses/user_timeline', function (error, tweets, response){
		if (!error) {
			// console.log(tweets);
			for (i=0; i < 20; i++){
				var twits = parseInt([i])+1;
				console.log("Tweet #", twits, " : ", tweets[i].text);
				console.log(" ----- ");
			} if (error) {
				console.log(error);
			}
		}
	})
}

//============================================================
//function to call "do-what-it-says" which I'm not exactly clear about but will call the random file anyways.
function doWhatSays() {
	console.log("here will soon be a random thing from the txt file");
}
