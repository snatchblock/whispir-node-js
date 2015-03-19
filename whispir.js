var request = require('request');
var Q = require('q');
var retrieveContacts = require('./retrieveContacts'); //limited to default company workspace

var apikey = 'YOUR-API-KEY';

var commons = {
  uri: 'http://api.whispir.com/messages?apikey=' + apikey,
  auth: { user: 'USERNAME', pass: 'PASSWORD' },
  headers: {
    'Accept': 'application/vnd.whispir.message-v1+json',
    'X-Originating-Ip': 'YOUR.IP.ADDRESS.INFO',
    'Content-Type': 'application/vnd.whispir.message-v1+json'
  }
};

//Send Messages
var sendMessage = function (contactsData, pick){
  var deferred = Q.defer();
  var contactData = contactsData[pick];
  var data = {
    'to' : contactData.phone,
    'subject' : "Ahoy! " + contactData.name + ",",
    'body' : "Hi how are you?"
  };
  request.post(
      commons.uri,
      { 
        auth: commons.auth,
        headers: commons.headers,
        body: JSON.stringify(data)
      },
      function (error, response, body) {
          console.log('RESPONSE - SMS');
          if (!error && response.statusCode == 202) {
            console.log(body);
            deferred.resolve(contactsData);
          }else{
            console.log('error: ', error);
            console.log('status:', response.statusCode);
            console.log('response:', response.headers);
            console.log('body:', body);
            deferred.reject(error);
          }
      }
  );
  return deferred.promise;
};

// Send Email
var sendAnEmail = function (contactsData, pick){
  var deferred = Q.defer();
  var contactData = contactsData[pick];
  var data = {
      "to" : contactData.email,
      "subject" :"A Hello from Wispir API EMAIL endpoint",
      "email" :{
        "body" :"Hi how are you?",
        "type" :"text/plain"
      }
  };
  request.post(
      commons.uri,
      { 
        auth: commons.auth,
        headers: commons.headers,
        body: JSON.stringify(data)
      },
      function (error, response, body) {
          console.log('RESPONSE - EMAIL');
          if (!error && response.statusCode == 202) {
            console.log(body);
            deferred.resolve(contactsData);
          }else{
            console.log('error: ', error);
            console.log('status:', response.statusCode);
            console.log('response:', response.headers);
            console.log('body:', body);
            deferred.reject(error);
          }
      }
  );
  return deferred.promise;
};

// Voice Call
var makeACall = function (contactsData, pick){
  var deferred = Q.defer();
  var contactData = contactsData[pick];
  var data = {
      "to" : contactData.phone,
      "subject":"Ahoy!",
      "voice":{
        "header": "Whispir API Voice",
        "body": "Hi, how are you?",
        "type": "ConfCall:,ConfAccountNo:,ConfPinNo:,ConfModPinNo:,Pin:"
      }
  };
  request.post(
      commons.uri,
      { 
        auth: commons.auth,
        headers: commons.headers,
        body: JSON.stringify(data)
      },
      function (error, response, body) {
          console.log('RESPONSE - CALL');
          if (!error && response.statusCode == 202) {
            console.log(body);
            deferred.resolve(contactsData);
          }else{
            console.log('error: ', error);
            console.log('status:', response.statusCode);
            console.log('response:', response.headers);
            console.log('body:', body);
            deferred.reject(error);
          }
      }
  );
  return deferred.promise;
};
  
retrieveContacts.retrieveContactList()
.then(
  function (allContactsData) {
    return sendMessage(allContactsData, 'contact1');
  },
  console.error)
.then(
  function (allContactsData) {
    return sendMessage(allContactsData, 'contact2');
  },
  console.error)
.then(
  function (allContactsData) {
    return makeACall(allContactsData, 'contact1');
  },
  console.error)
.then(
  function (allContactsData) {
    return makeACall(allContactsData, 'contact2');
  },
  console.error)
.then(
  function (allContactsData) {
    return sendAnEmail(allContactsData, 'contact1');
  },
  console.error)
.then(
  function (allContactsData) {
    console.log(allContactsData);
    console.log(null, 'Hello Sheeple!');
  },
  null);  // SUCCESS with message

/* 
  Obligatory note: 
   - if you think, this code bad, improve it. 
   - this is just a POC and playground. 
   - may not be a best practice in all possible scenarios.
  */