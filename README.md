# whispir-node-js
This code example shows how to use NodeJS to consume Whispir API and send SMS, Email, and trigger Voice Calls (and more).

[Whispir](http://www.whispir.com) is a cross channel communications platform. You can send messages, emails, make voice calls, geo-tagging, IVR... and it has an API that can be consumed for free (registration required) upto a limit. 

Registration gives you authentication rights, as well as a API Key to be used. This is mandatory before you begin. Every safe API does it. You can read more at http://developer.whispir.com especially the "features" and its sub-pages. Its a fantastic and easy to use API. Surely give it a try. 

###sending a text message

* endpoint - `http://api.whispir.com/messages?apikey=YOUR_API_KEY_HERE`

* mandatory headers
```
headers: {
    'Accept': 'application/vnd.whispir.message-v1+json',
    'X-Originating-Ip': 'YOUR.MACHINE.IP.ADDRESS',
    'Content-Type': 'application/vnd.whispir.message-v1+json'
  }
```

the `Accept` value as well as the `Content-Type` values are very important. You have already observed the `vnd.whispir.message-v1+json` says, 

* the resource type is for `message` 
* should refer to `v1` version of the API 
* should return `json` type data. If you want xml data, then change it from 'json' to 'xml'. 

for more info on the content type and versioning read [here] (http://developer.whispir.com/docs/read/API_Content_Types__Versioning)

 ###other API end points too follow the same structure. read more from the [io docs] (http://developer.whispir.com/io-docs).


###Code

- the code requests the contacts api (POST) to provide it with contacts present in your adress book
- (or) you can use the dummy function to setup any two names and contact values for them
- then sends SMS to both the contacts
- email to one of them
- and calls to both of them

####npm-modules

`request` and `Q` are used. so ensure you run the `npm install request -g` and `npm install Q` commands before doing the `node whispir` for the first time.
