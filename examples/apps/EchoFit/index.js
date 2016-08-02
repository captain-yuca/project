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
			else if(Date().getHours() >= 11 && Date().getHours() < 17){
				mealName="lunch";
			}
			else if(Date().getHours() >= 17 || Date().getHours() < 3){
				mealName="dinner";
			}
		}
		else {
			mealName = req.slot('mealName');
		}

		//insert API code here

		res.say('Okay, I logged '+req.slot('foodQuantity')+req.slot('foodName')+' for '+req.slot('mealName'));
	}
);




module.exports = app;
