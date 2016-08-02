var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('echoFit');

app.launch(function(req,res) {
	var prompt = "Ask away";
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('addToMealIntent',{
		"slots":{"foodName":"LITERAL", "mealName":"LITERAL", "foodQuantity":"LITERAL", "servingName":"LITERAL"},
		"utterances":[
"I'm eating {foodName}",
"I ate {foodName}",
"I had {foodName}",
"I just ate {foodName}",
"I'm eating {foodQuantity} {foodName}",
"I'm eating {foodQuantity} of {foodName}",
"I'm eating {foodQuantity} {servingName} of {foodName}",
"I ate {foodQuantity} {foodName}",
"I ate {foodQuantity} of {foodName}",
"I ate {foodQuantity} {servingName} of {foodName}",
"I had {foodQuantity} {foodName}",
"I had {foodQuantity} of {foodName}",
"I had {foodQuantity} {servingName} of {foodName}",
"I just ate {foodQuantity} {foodName}",
"I just ate {foodQuantity} of {foodName}",
"I just ate {foodQuantity} {servingName} of {foodName}",
"I'm eating {foodName} for {mealName}",
"I ate {foodName} for {mealName}",
"I had {foodName} for {mealName}",
"I just ate {foodName} for {mealName}",
"I just had {foodName} for {mealName}",
"for {mealName} I'm eating {foodName}",
"for {mealName} I ate {foodName}",
"for {mealName} I had {foodName}",
"for {mealName} I just ate {foodName}",
"for {mealName} I just had {foodName}",
"I'm eating {foodQuantity} {foodName} for {mealName}",
"I'm eating {foodQuantity} of {foodName} for {mealName}",
"I'm eating {foodQuantity} {servingName} of {foodName} for {mealName}",
"I ate {foodQuantity} {foodName} for {mealName}",
"I ate {foodQuantity} of {foodName} for {mealName}",
"I ate {foodQuantity} {servingName} of {foodName} for {mealName}",
"I had {foodQuantity} {foodName} for {mealName}",
"I had {foodQuantity} of {foodName} for {mealName}",
"I had {foodQuantity} {servingName} of {foodName} for {mealName}",
"I just ate {foodQuantity} {foodName} for {mealName}",
"I just ate {foodQuantity} of {foodName} for {mealName}",
"I just ate {foodQuantity} {servingName} of {foodName} for {mealName}",
"I just had {foodQuantity} {foodName} for {mealName}",
"I just had {foodQuantity} of {foodName} for {mealName}",
"I just had {foodQuantity} {servingName} of {foodName} for {mealName}",
"for {mealName} I'm eating {foodQuantity} {foodName}",
"for {mealName} I'm eating {foodQuantity} of {foodName}",
"for {mealName} I'm eating {foodQuantity} {servingName} of {foodName}",
"for {mealName} I ate {foodQuantity} {foodName}",
"for {mealName} I ate {foodQuantity} of {foodName}",
"for {mealName} I ate {foodQuantity} {servingName} of {foodName}",
"for {mealName} I had {foodQuantity} {foodName}",
"for {mealName} I had {foodQuantity} of {foodName}",
"for {mealName} I had {foodQuantity} {servingName} of {foodName}",
"for {mealName} I just ate {foodQuantity} {foodName}",
"for {mealName} I just ate {foodQuantity} of {foodName}",
"for {mealName} I just ate {foodQuantity} {servingName} of {foodName}",
"for {mealName} I just had {foodQuantity} {foodName}",
"for {mealName} I just had {foodQuantity} of {foodName}",
"for {mealName} I just had {foodQuantity} {servingName} of {foodName}"]
	},
	function(req,res) {
		var foodName = req.slot('foodName');
		var foodQuantity = -1;
		var mealName = -1;
	  
		if (req.slot('foodQuantity')=='a' || req.slot('foodQuantity')=='an') {
			foodQuantity = 1;
		}
		else {
			foodQuantity = parseInt(req.slot('foodQuantity'));
		}
		
		if (req.slot('mealName') == null) {
			if(Date().getHours() >= 3 && Date().getHours() < 11){
				mealName="breakfast";				
			}
			else if(Date().getHours() >= 11 && Date().getHours() < 5){
				mealName="lunch";				
			}
			else if(Date().getHours() >= 5 && Date().getHours() < 3){
				mealName="dinner";				
			}
		}
		else {
			mealName = req.slot('mealName');
		}

		//insert API code here
		
		res.say('Okay, I logged '+req.slot('foodQuantity')+req.slot('foodName')+' for '+req.slot('mealName');
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
		,"utterances":["How many calories in {apple|banana|foodName}",]
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
