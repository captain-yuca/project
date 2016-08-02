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

var foodSearch = {
  format: 'json',
  method: 'foods.search',
  oauth_consumer_key: apiKey,
  oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: Math.floor(date.getTime() / 1000),
  oauth_version: '1.0',
  search_expression: encodeURIComponent("bread") // test query
};


//callSearchAPI(foodSearch);
//requestUserToken(requestID);
//callGeneralAPI(genProfile);
authenticate(getAuth);


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
      setUpDetailedView(data);
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
    
      console.log(data);
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
  sharedSecret2 = sharedSecret + "&" + dataObj.profile.auth_secret.toString();

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

function setUpDetailedView(data)
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
    userAuthorize(data);
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

function authenticate(reqObj)
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
      getProfile(data);
  });
}

function getProfile(data)
{
    var newDate = new Date;
    console.log(data.profile.auth_token);
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