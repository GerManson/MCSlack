// Dependencies
var express = require('express');
var dotenv = require('dotenv');

var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;


// Loading environment configurations (.env file)
dotenv.load();
var token = process.env.SLACK_TOKEN || '';

// Initializations
var app = express();
var rtm = new RtmClient(token, {logLevel: 'live'});
rtm.start();


// routes and responses
app.get('/', function (req, res) {
  res.send('Server Running...!');
});


// LISTENING FOR SLACK EVENTS
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {

});

rtm.on(RTM_EVENTS.MESSAGE, function (message) {

  // reply
  rtm.sendMessage('soy tu espejo: ' + message.text, message.channel, function messageSent() {
    console.log(message);
  });

});

rtm.on(RTM_EVENTS.CHANNEL_CREATED, function (message) {
  // Listens to all `channel_created` events from the team
});

// Server Start
app.listen(3000, function () {
  console.log('MCSlack Server listening on port 3000!');
});
