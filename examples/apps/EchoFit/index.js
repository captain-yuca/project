var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('echoFit');

app.launch(function(req,res) {
	var prompt = "Ask away";
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});
app.intent('foodCalorieIntent',{
		"slots":{"foodName":"LITERAL"}
		,"utterances":["How many calories in {apple|banana|foodName}"]
	},
	function(req,res) {
	  var calories;
		if (req.slot('foodName')=='apple') {
			calories = 20;
		}
		else if (req.slot('foodName')=='banana') {
			calories = 30;
		}
		else {
			res.say("What are you doing?!");
		}
		res.say(req.slot('foodName')+' has '+ calories);
	}
);
app.intent('recentFoodIntent',{
		"slots":{}
		,"utterances":["What are my recent foods?"]
	},
	function(req,res) {
		res.say('Your recent foods are apples and bananas');
	}
);
app.intent('favFoodIntent',{
		"slots":{"foodName":"LITERAL"}
		,"utterances":["How many calories in {apple|banana|foodName}"]
	},
	function(req,res) {
	  var calories;
		if (req.slot('foodName')=='apple') {
			calories = 20;
		}
		else if (req.slot('foodName')=='banana') {
			calories = 30;
		}
		else {
			res.say("What are you doing?!");
		}
		res.say(req.slot('foodName')+' has '+ calories);
	}
);
app.intent('checkCaloriesIntent',{
		"slots":{"foodName":"LITERAL", "mealName":"LITERAL"}
		,"utterances":["How many calories in {apple|banana|foodName}"]
	},
	function(req,res) {
	  var calories;
		if (req.slot('foodName')=='apple') {
			calories = 20;
		}
		else if (req.slot('foodName')=='banana') {
			calories = 30;
		}
		else {
			res.say("What are you doing?!");
		}
		res.say(req.slot('foodName')+' has '+ calories);
	}
);
app.intent('removeFromMeal',{
		"slots":{"foodName":"LITERAL"}
		,"utterances":["How many calories in {apple|banana|foodName}"]
	},
	function(req,res) {
	  var calories;
		if (req.slot('foodName')=='apple') {
			calories = 20;
		}
		else if (req.slot('foodName')=='banana') {
			calories = 30;
		}
		else {
			res.say("What are you doing?!");
		}
		res.say(req.slot('foodName')+' has '+ calories);
	}
);
app.intent('foodCalorieIntent',{
		"slots":{"foodName":"LITERAL"}
		,"utterances":["How many calories in {apple|banana|foodName}"]
	},
	function(req,res) {
	  var calories;
		if (req.slot('foodName')=='apple') {
			calories = 20;
		}
		else if (req.slot('foodName')=='banana') {
			calories = 30;
		}
		else {
			res.say("What are you doing?!");
		}
		res.say(req.slot('foodName')+' has '+ calories);
	}
);
app.intent('weightIntent',{
		"slots":{"foodName":"LITERAL"}
		,"utterances":["How many calories in {apple|banana|foodName}"]
	},
	function(req,res) {
	  var calories;
		if (req.slot('foodName')=='apple') {
			calories = 20;
		}
		else if (req.slot('foodName')=='banana') {
			calories = 30;
		}
		else {
			res.say("What are you doing?!");
		}
		res.say(req.slot('foodName')+' has '+ calories);
	}
);
module.exports = app;
