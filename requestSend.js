// Dependencies and constants
var rest              = require('restler'),
    crypto            = require('crypto'),
    converter         = require('xml2js').parseString,
    apiKey           = 'bf03affc64d64ff7950950f990b34b21',
    fatSecretRestUrl = 'http://platform.fatsecret.com/rest/server.api',
    sharedSecret     = '7a19de3308544f93a4971d1242101e7d',
    date             = new Date;

// Note that the keys are in alphabetical order
var reqObj = {
  method: 'foods.search',
  oauth_consumer_key: apiKey,
  oauth_nonce: Math.random().toString(36).replace(/[^a-z]/g, '').substr(2),
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: Math.floor(date.getTime() / 1000),
  oauth_version: '1.0',
  search_expression: 'banana' // test query
};

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
sharedSecret += "&";

var hashedBaseStr  = crypto.createHmac('sha1', sharedSecret).update(sigBaseStr).digest('base64');

// Add oauth_signature to the request object
reqObj.oauth_signature = hashedBaseStr;

// Launch!
rest.post(fatSecretRestUrl, {
  data: reqObj
}).on('complete', function(data, response) {
  //convert the data from XML to JSON format
  var xml = data;
  converter(xml, function (err, result) {
    console.log(result.foods.food[0]);
});
});


