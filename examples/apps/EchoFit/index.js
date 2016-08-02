var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('echoFit');

app.launch(function(req,res) {
	var prompt = "Ask away";
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});
// app.intent('recentFoodIntent',{
// 		"slots":{}
// 		,"utterances":["What are my recent foods?",
// 	"List recent foods"]
// 	},
// 	function(req,res) {
// 		res.say('Your recent foods are apples and bananas');
// 	}
// );
// app.intent('favFoodIntent',{
// 		"slots":{}
// 		,"utterances":["What is my favorite food?"]
// 	},
// 	function(req,res) {
// 	  var calories;
// 		if (req.slot('foodName')=='apple') {
// 			calories = 20;
// 		}
// 		else if (req.slot('foodName')=='banana') {
// 			calories = 30;
// 		}
// 		else {
// 			res.say("What are you doing?!");
// 		}
// 		res.say(req.slot('foodName')+' has '+ calories);
// 	}
// );
// app.intent('checkCaloriesIntent',{
// 		"slots":{"foodName":"LITERAL", "mealName":"LITERAL"}
// 		,"utterances":["How many calories in {apple|banana|foodName}"]
// 	},
// 	function(req,res) {
// 	  var calories;
// 		if (req.slot('foodName')=='apple') {
// 			calories = 20;
// 		}
// 		else if (req.slot('foodName')=='banana') {
// 			calories = 30;
// 		}
// 		else {
// 			res.say("What are you doing?!");
// 		}
// 		res.say(req.slot('foodName')+' has '+ calories);
// 	}
// );
// app.intent('removeFromMeal',{
// 		"slots":{"foodName":"LITERAL"}
// 		,"utterances":["How many calories in {apple|banana|foodName}"]
// 	},
// 	function(req,res) {
// 	  var calories;
// 		if (req.slot('foodName')=='apple') {
// 			calories = 20;
// 		}
// 		else if (req.slot('foodName')=='banana') {
// 			calories = 30;
// 		}
// 		else {
// 			res.say("What are you doing?!");
// 		}
// 		res.say(req.slot('foodName')+' has '+ calories);
// 	}
// );
// app.intent('foodCalorieIntent',{
// 		"slots":{"foodName":"LITERAL"}
// 		,"utterances":["How many calories in {apple|banana|foodName}"]
// 	},
// 	function(req,res) {
// 	  var calories;
// 		if (req.slot('foodName')=='apple') {
// 			calories = 20;
// 		}
// 		else if (req.slot('foodName')=='banana') {
// 			calories = 30;
// 		}
// 		else {
// 			res.say("What are you doing?!");
// 		}
// 		res.say(req.slot('foodName')+' has '+ calories);
// 	}
// );
app.intent('weightInIntent',{
		"slots":{"weight":"NUMBER", "units":"LITERAL"}
		,"utterances":["My current weight is {1-500|weight} ",
									"My weight is {1-500|weight}",
									"Weight is {1-500|weight}",
									"I just weighed myself and my weight is {1-500|weight}",
									"I just weighed myself, my weight is {1-500|weight}",
									"I just weighed myself, i'm {1-500|weight}{1-500|weight}",
									"I just weighed {1-500|weight}",
									"Pained to say this, I weigh {1-500|weight}",
									"My weight was {1-500|weight}",
									"{1-500|weight} is my weight",
									"I weigh {1-500|weight}",
									"I'm weighing {1-500|weight}",
									"Currently, my weight is {1-500|weight}",
									"Currently, I weigh {1-500|weight}",
									"My current weight is {1-500|weight} {pounds|kilograms|kilos|units}",
									"My weight is {1-500|weight} {pounds|kilograms|kilos|units}",
									"Weight is {1-500|weight} {pounds|kilograms|kilos|units}",
									"I just weighed myself and my weight is {1-500|weight} {pounds|kilograms|kilos|units}",
									"I just weighed myself, my weight is {1-500|weight} {pounds|kilograms|kilos|units}",
									"I just weighed myself, I'm {1-500|weight}{1-500|weight} {pounds|kilograms|kilos|units}",
									"I just weighed {1-500|weight} {pounds|kilograms|kilos|units}",
									"Pained to say this, I weigh {1-500|weight} {pounds|kilograms|kilos|units}",
									"My weight was {1-500|weight} {pounds|kilograms|kilos|units}",
									"{1-500|weight} {pounds|kilograms|kilos|units} is my weight",
									"I weigh {1-500|weight} {pounds|kilograms|kilos|units}",
									"I'm weighing {1-500|weight} {pounds|kilograms|kilos|units}",
									"Currently, my weight is {1-500|weight} {pounds|kilograms|kilos|units}",
									"Currently, I weigh {1-500|weight} {pounds|kilograms|kilos|units}"]
	},
	function(req,res) {
	  var weight;
		var goalWeight = 120;
		var goalProgress = goalWeight - req.slot('weight');
		if (req.slot('units')=='kilos'||'kilograms') {
			//convertion to pounds
		}

		res.say('OK, you need to lose '+ goalProgress + ' pounds to reach your goal');
	}
);

module.exports = app;
