// Dependencies
var dotenv = require('dotenv');
var _ = require('underscore');

var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;


// Loading environment configurations (.env file)
dotenv.load();
var token = process.env.SLACK_TOKEN || '';

// Initializations
var rtm = new RtmClient(token, {logLevel: 'live'});
rtm.start();

var app = {
  commandsAvailable: [
    'status', 'help', 'play', 'add', 'clear', 'queue', 'info'
  ],

  isAction: function(text) {
    return (_.indexOf(this.commandsAvailable, text) > -1);
  }
};

rtm.on(RTM_EVENTS.MESSAGE, function (message) {

  var response = "I am sorry, I didnt understand what you said, type help to see a list of available commands";
  var isAction = false;

  isAction = app.isAction(message.text);

  if (isAction) {
    response = "I understood!!";
  }

  // reply
  rtm.sendMessage(response, message.channel, function messageSent() {
    console.log(message);
  });

});

rtm.on(RTM_EVENTS.CHANNEL_CREATED, function (message) {
  // Listens to all `channel_created` events from the team
});

rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  console.log("M.C. Slack Server connected & running.");
  console.log("");
  console.log("┏(-_-)┛ ┗(-_-﻿ )┓ ┗(-_-)┛ ┏(-_-)┓  PARTY TIME!");
  console.log("---------------------------------------------");
});

rtm.on(RTM_CLIENT_EVENTS.DISCONNECT, function() {
  console.log("¯\_(ツ)_/¯");
  console.log("M.C. Slack Server disconnected, restart server to connect again.");
});



console.log("Initializing server..");
console.log("Starting..");
console.log("Connecting..");
