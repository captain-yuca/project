// Dependencies and constants
  
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

// Note that the keys MUST BE in alphabetical order
var requestID = {
  oauth_callback: 'oob',
  oauth_consumer_key: apiKey,
  oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: Math.floor(date.getTime() / 1000),
  oauth_version: '1.0'
};

var genProfile = {
  format: 'json',
  method: 'profile.create',
  oauth_consumer_key: apiKey,
  oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: Math.floor(date.getTime() / 1000),
  oauth_version: '1.0',
  user_id: "TEST1"
};

// current accts are: CTKnoll, NAKnoll
var getAuth = {
  format: 'json',
  method: 'profile.get_auth',
  oauth_consumer_key: apiKey,
  oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: Math.floor(date.getTime() / 1000),
  oauth_version: '1.0',
  user_id: "CTKnoll"
};

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

var userAuth = {
  oauth_consumer_key: apiKey,
  oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: Math.floor(date.getTime() / 1000),
  oauth_token: 'a89317f85f3d40e79b8e1d08204ec363',
  oauth_verifier: '3870685',
  oauth_version: '1.0'
};

//requestUserToken(requestID);
//getAccessToken(userAuth);

callSearchAPI(foodSearch);
//callGeneralAPI(genProfile);
//authenticate(getAuth, editWeight, 100);
//authenticate(getAuth, getProfile, null);
//callTokenAPI(getRyanInfo);

function callSearchAPI(reqObj)
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
      getFoodInfo(data);
  });
}

function callGeneralAPI(reqObj)
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
    
      console.log(data.food.servings.serving[0].calories);
  });
}

function callTokenAPI(reqObj, dataObj)
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
    
      console.log(data);
  });
}

function getFoodInfo(data)
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
  callGeneralAPI(foodObj);
}

function requestUserToken(reqObj)
{
    // construct a param=value& string and uriEncode
  var paramsStr = '';
  for (var i in reqObj) {
    paramsStr += "&" + i + "=" + reqObj[i];
  }

  // yank off that first "&"
  paramsStr = paramsStr.substr(1);

  var sigBaseStr = "POST&"
                   + encodeURIComponent(requestTokenUrl)
                   + "&"
                   + encodeURIComponent(paramsStr);

  // no  Access Token token (there's no user .. we're just calling foods.search)
  sharedSecret2 = sharedSecret + "&" ;

  var hashedBaseStr  = crypto.createHmac('sha1', sharedSecret2).update(sigBaseStr).digest('base64');


  // Add oauth_signature to the request object
  reqObj.oauth_signature = hashedBaseStr;

  // Launch!
  rest.post(requestTokenUrl, {
    data: reqObj
  }).on('complete', function(data, response) {
    //convert the data from XML to JSON format
    console.log(data);
  });
}


function userAuthorize(reqData)
{
    var split = reqData.split('&')[1].split('=')[1];
    rest.post('http://www.fatsecret.com/oauth/authorize', {
    data: {oauth_token: split}
    }).on('complete', function(data, response) {
      //convert the data from XML to JSON format     
      http.createServer(function(request, response) {  
          response.writeHeader(200, {"Content-Type": "text/html"});  
          response.write(data);  
          response.end();  
      }).listen(8000);
});
    
}

function getAccessToken(reqObj)
{
    var paramsStr = '';
  for (var i in reqObj) {
    paramsStr += "&" + i + "=" + reqObj[i];
  }

  // yank off that first "&"
  paramsStr = paramsStr.substr(1);

  var sigBaseStr = "POST&"
                   + encodeURIComponent('http://www.fatsecret.com/oauth/access_token')
                   + "&"
                   + encodeURIComponent(paramsStr);

  // no  Access Token token (there's no user .. we're just calling foods.search)
  sharedSecret2 = sharedSecret + "&" + 'db87e81b060d4d3a8f3c022a259cc9aa';

  var hashedBaseStr  = crypto.createHmac('sha1', sharedSecret2).update(sigBaseStr).digest('base64');


  // Add oauth_signature to the request object
  reqObj.oauth_signature = hashedBaseStr;

  // Launch!
  rest.post('http://www.fatsecret.com/oauth/access_token', {
    data: reqObj
  }).on('complete', function(data, response) {
    //convert the data from XML to JSON format
    console.log(data);
  });
}

function authenticate(reqObj, callback, val)
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
      data.customVal = val;
      callback(data);
  });
}

function getProfile(data)
{
    var newDate = new Date;
    var profileFromID = {
    format: 'json',
    method: 'profile.get',
    oauth_consumer_key: apiKey,
    oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(newDate.getTime() / 1000),
    oauth_token: data.profile.auth_token.toString(),
    oauth_version: '1.0'
  };
  callTokenAPI(profileFromID, data);
}

//current height and goal weight arent required, and require us to customize it for first time use
function editWeight(data)
{
    var newDate = new Date;
    var profileFromID = {
    //current_height_cm: 200,
    current_weight_kg: data.customVal,
    format: 'json',
    //goal_weight_kg: 100,
    method: 'weight.update',
    oauth_consumer_key: apiKey,
    oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(newDate.getTime() / 1000),
    oauth_token: data.profile.auth_token.toString(),
    oauth_version: '1.0'
  };
  callTokenAPI(profileFromID, data);
}