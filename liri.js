
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
function spotifys(song) {
	// console.log("will soon spotify the song: ", userInput[3]);

	var spotSearch = new spotify(keys.spotifyKeys);

	if (userInput.length > 4) {
		for (i=3; i < userInput.length; i++){
			song += userInput[i] + "%20";
		}
		// console.log("split song name is: ", song);
	} 
	if (userInput.length === 4) {
		song = userInput[3];
		console.log("not-split song name is: ", song);
	} else if (userInput.length < 3) {
		console.log("No song title was provided, but here is Bicicleta by Shakira and Carlos Vives!!")
		song = "bicicleta";
	}

	spotSearch.search({type:'track', query: song, limit: 1}).then(function(response) {
		// console.log(response);
		var songReturned = response.tracks.items[0];


		// console.log(JSON.stringify(songReturned, null, 4));


		// cannot get the Artist name to come up as other than undefined...?! 
		console.log("Artist: " + songReturned.artists.name);
		console.log("Song Title: " + songReturned.name);
		console.log("Preview Link: " + songReturned.preview_url);
		console.log("Album: " + songReturned.album.name);
	}).catch(function(err) {
		console.log(error);
	});

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

function omdbs(movieName) {
	// console.log("will soon call OMDB to get info on movie: ", userInput[3]);
	
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

	fs.readFile("random.txt", "utf8", function(error, data) {
		if(error) {
			return console.log(error);
		}

		console.log(data);

		var dataArr = data.split(",");

		for (var i=0; i < dataArr.length; i++) {
			console.log(dataArr[i]);

		}
		if (dataArr[0] === "this-movie") {
			omdbs(dataArr[1]);
		} else if (dataArr[0] === "my-tweets") {
			twitters();
		} else if (dataArr[0] === "spotify-this-song") {
			spotifys(dataArr[1]);
		} else {
			console.log("invalid command");
		}

	})

}

























