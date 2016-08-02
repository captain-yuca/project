var alexa = require('alexa-app');
var http = require('http'),
    fs = require('fs'),
    rest              = require('restler'),
    crypto            = require('crypto'),
    apiKey           = 'bf03affc64d64ff7950950f990b34b21',
    sharedSecret     = '7a19de3308544f93a4971d1242101e7d',
    //apiKey2          = 'ddde9b47ca8445cc94110085df4de397',
    //secret2          = '44e97c7918354c42b01c905d46394889'
    fatSecretRestUrl = 'http://platform.fatsecret.com/rest/server.api',
    requestTokenUrl   = 'http://www.fatsecret.com/oauth/request_token',
    date             = new Date;

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
app.intent('checkCaloriesIntent',{
		"slots":{"foodName":"LITERAL", "mealName":"LITERAL"}
		,"utterances":["How many calories in {apple|banana|foodName}"]
	},
	function(req,res) {
	  var calories;
		var foodSearch = {
		  format: 'json',
		  method: 'foods.search',
		  oauth_consumer_key: apiKey,
		  oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
		  oauth_signature_method: 'HMAC-SHA1',
		  oauth_timestamp: Math.floor(date.getTime() / 1000),
		  oauth_version: '1.0',
		  search_expression: "bread" // test query
		};
		callSearchAPI(foodSearch, function(results1){
        console.log(results1 + ' in callSearchAPI');
            setUpDetailedView(results1, function(results2){
              console.log(results2 + ' in setUpDetailedView');
                callGeneralAPI(results2, function(results3){
                  console.log(results3 + ' in callGeneralAPI');
                    global.calories = results3.food.servings.serving[0].calories;
                    console.log(global.calories);
                    res.say(req.slot('foodName')+' has '+ global.calories + 'calories');
                    res.send();
                });
            });
        });

        return false;
		}


);



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
                        var getRyanInfo = {
                          format: 'json',
                          method: 'profile.get',
                          oauth_consumer_key: apiKey,
                          oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
                          oauth_signature_method: 'HMAC-SHA1',
                          oauth_timestamp: Math.floor(date.getTime() / 1000),
                          oauth_token: '121fcf7d265a48df94219a9aac64f47c',
                          oauth_version: '1.0',

                        };
                        var lastWeight
                        editRyanWeight(getRyanInfo, req.slot('weight')/2.2, function(result1){
                            callTokenAPI(getRyanInfo, function(prof){
                                lastWeight = Math.round((prof.profile.last_weight_kg)*2.2);
                                console.log(lastWeight);
                            });
                            callTokenAPI(result1, function(results2){
                                res.say('OK, I logged '+ Math.round(req.slot('weight')) + ' pounds from ' + lastWeight);

                                res.send();
                            });

                        });
    					// if (req.slot('units')=='kilos'||'kilograms') {
    					// 	//convertion to pounds
    					// }
                        return false;
    				}
    			);

app.intent('addToMealIntent',{
		"slots":{"foodName":"LITERAL", "mealName":"LITERAL", "foodQuantity":"LITERAL", "servingName":"LITERAL"},
		"utterances":["I'm eating {foodName}",
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



































function callSearchAPI(reqObj, callback)
{
  // construct a param=value& string and uriEncode
  var paramsStr = '';
  for (var i in reqObj) {
    paramsStr += "&" + i + "=" + reqObj[i];
  }

  // yank off that first "&"
  paramsStr = paramsStr.substr(1);

  var sigBaseStr = "POST&"
                   + encodeURIComponent(fatSecretRestUrl)
                   + "&"
                   + encodeURIComponent(paramsStr);

  // no  Access Token token (there's no user .. we're just calling foods.search)
  sharedSecret2 = sharedSecret + "&";

  var hashedBaseStr  = crypto.createHmac('sha1', sharedSecret2).update(sigBaseStr).digest('base64');

  // Add oauth_signature to the request object
  reqObj.oauth_signature = hashedBaseStr;
  // Launch!
  rest.post(fatSecretRestUrl, {
    data: reqObj
  }).on('complete', function(data, response) {
    //convert the data from XML to JSON format
      callback(data);
  });
}
function setUpDetailedView(data, callback)
{
    var newDate = new Date;
    var foodObj = {
    food_id: data.foods.food[0].food_id,
    format: 'json',
    method: 'food.get',
    oauth_consumer_key: apiKey,
    oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(newDate.getTime() / 1000),
    oauth_version: '1.0'
  };
  callback(foodObj);
}
function callGeneralAPI(reqObj, callback)
{
  // construct a param=value& string and uriEncode
  var paramsStr = '';
  for (var i in reqObj) {
    paramsStr += "&" + i + "=" + reqObj[i];
  }

  // yank off that first "&"
  paramsStr = paramsStr.substr(1);

  var sigBaseStr = "POST&"
                   + encodeURIComponent(fatSecretRestUrl)
                   + "&"
                   + encodeURIComponent(paramsStr);

  // no  Access Token token (there's no user .. we're just calling foods.search)
  sharedSecret2 = sharedSecret + "&";

  var hashedBaseStr  = crypto.createHmac('sha1', sharedSecret2).update(sigBaseStr).digest('base64');


  // Add oauth_signature to the request object
  reqObj.oauth_signature = hashedBaseStr;

  // Launch!
  rest.post(fatSecretRestUrl, {
    data: reqObj
  }).on('complete', function(data, response) {
    //convert the data from XML to JSON format

      callback(data);
  });
}






function editRyanWeight(data, number, callback)
{
    var newDate = new Date;
    var profileFromID = {
    //current_height_cm: 200,
    current_weight_kg: number,
    format: 'json',
    //goal_weight_kg: 100,
    method: 'weight.update',
    oauth_consumer_key: apiKey,
    oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(newDate.getTime() / 1000),
    oauth_token: data.oauth_token,
    oauth_version: '1.0'
  };
  callback(profileFromID);
}

function callTokenAPI(reqObj, callback)
{
  // construct a param=value& string and uriEncode
  var paramsStr = '';
  for (var i in reqObj) {
    paramsStr += "&" + i + "=" + reqObj[i];
  }

  // yank off that first "&"
  paramsStr = paramsStr.substr(1);

  var sigBaseStr = "POST&"
                   + encodeURIComponent(fatSecretRestUrl)
                   + "&"
                   + encodeURIComponent(paramsStr);

  // no  Access Token token (there's no user .. we're just calling foods.search)
  //sharedSecret2 = sharedSecret + "&" + dataObj.profile.auth_secret.toString();
  sharedSecret2 = sharedSecret + "&" + '9c974fb87f534a5297a850d674b11432';

  var hashedBaseStr  = crypto.createHmac('sha1', sharedSecret2).update(sigBaseStr).digest('base64');


  // Add oauth_signature to the request object
  reqObj.oauth_signature = hashedBaseStr;

  // Launch!
  rest.post(fatSecretRestUrl, {
    data: reqObj
  }).on('complete', function(data, response) {
    //convert the data from XML to JSON format

      callback(data);
  });
}






module.exports = app;
