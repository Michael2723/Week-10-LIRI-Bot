var Twitter = require('twitter');
var keys = require("./keys.js");
var spotify = require('spotify');

function myTweets(){
	var params = {screen_name: 'MichaelWeaver23', count: 10};
	twitter.get(
		'statuses/user_timeline',
		params,
		function(error, tweets, response) {
  		if (error) {
    		console.log(error);
  		}else{
  			tweets.forEach(function(tweet){
	  			var tweetOutput = "Tweet: " + tweet.text + "\n" +
	  				"Published: " + tweet.created_at + "\n";
	  			
	  			logText(tweetOutput);
  			})
  		}
  		
  		start();
	});
}

function chosenSpotify(userSpotInput){
	spotify.search({
		type: 'track',
		query: userSpotInput
	}, function(err, userSpotInput) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	    	var userSI = userSpotInput.tracks.items[0];
	  		var spotifyOutput = "Artist: " + userSI.artists[0].name + "\n" +
	  			"Song Name: " + userSI.name + "\n" +
	  			"Spot Link: " + userSI.external_urls.spotify + "\n" +
	  			"Album: " + userSI.album.name + "\n";
	  		
	  		logText(spotifyOutput);			
	    }

	    start();
	});
}

function chosenMovie(userMovieInput){
	request(`http://www.omdbapi.com/?t=${userMovieInput}&y=&i=&plot=short&tomatoes=true&r=json`, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var parseUserInput = JSON.parse(body)
	  		var movieOutput = "Movie Title: " + parseUserInput.Title + "\n" +
	  			"Year Release: " + parseUserInput.Year + "\n" +
	  			"Country Produced: " + parseUserInput.Country + "\n" +
	  			"Language: " + parseUserInput.Language + "\n" +
	  			"Plot: " + parseUserInput.Plot + "\n" +
	  			"Actors: " + parseUserInput.Actors + "\n" +
	  			"IMBD Rating: " + parseUserInput.imdbRating + "\n" +
	  			"Rotten Tomatoes Rating: " + parseUserInput.tomatoRating + "\n" +
	  			"Rotten Tomatoes URL: " + parseUserInput.tomatoURL + "\n";
	  		
	  		logText(movieOutput);
		}
		
		start();
	});
}
