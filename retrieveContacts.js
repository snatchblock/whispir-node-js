var request = require('request');
var Q = require('q');

var apikey = 'YOUR-API-KEY';

/*
 - if you omit the queryFields, then you will get firstName, lastName, and a link to the full details of the contact. 
 - the fields allow you to fetch whatever fields you need in a single call

 - the Accept header states the mediaType as contact with version 1 and format of json
*/

var commons = {
  uri: 'http://api.whispir.com/contacts?apikey=' + apikey,
  queryFields: '&fields=firstName,lastName,workEmailAddress1,workMobilePhone1',
  auth: { user: 'USERNAME', pass: 'PASSWORD' },
  headers: {
    'X-Originating-Ip': 'YOUR.IP.ADDRESS.INFO',
    'Accept': 'application/vnd.whispir.contact-v1+json'
  }
};

var retrieveContactList = function () {
  var deferred = Q.defer();
  var contacts = {};
  request.get(
          commons.uri + commons.queryFields,
          { 
            auth: commons.auth,
            headers: commons.headers
          },
          function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  var result = JSON.parse(body);
                  var totalContacts = result.contacts.length;
                  var aContact;
                  while(--totalContacts >= 0) {
                    aContact = result.contacts[totalContacts];
                    contacts['contact' + (totalContacts + 1)] = {
                      'name': aContact['firstName'] + ' ' + aContact['lastName'],
                      'phone': (aContact['workMobilePhone1'].indexOf(0) === '+' ? aContact['workMobilePhone1'] : '+' + aContact['workMobilePhone1']),
                      'email': aContact["workEmailAddress1"]
                    };
                  }
                  deferred.resolve(contacts);
              }else{
                console.log('error: ', error);
                console.log('status:', response.statusCode);
                console.log('response:', response.headers);
                console.log('body:', body);
                deferred.reject(err);
              }
          }
      );
  return deferred.promise;
};

var twoContactsData = function (thefileName) {
  var deferred = Q.defer();
  var jsonDataOfContacts = {
    contact1 : {
      name : 'FN1 LN1',
      email: 'email1@live.com',
      phone: '+6512345678' //+ is mandatory
    },
    contact2 : {
      name : 'FN2 LN2',
      email: 'email2@live.com',
      phone: '+6587654321'
    }
  }
  deferred.resolve(jsonDataOfContacts);
  return deferred.promise;
};

module.exports = {
  retrieveContactList: retrieveContactList,
  twoContactsData: twoContactsData
};