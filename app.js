// Dependencies
var dotenv            = require('dotenv');
var _                 = require('underscore');
var RtmClient         = require('@slack/client').RtmClient;
var CLIENT_EVENTS     = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS        = require('@slack/client').RTM_EVENTS;
var RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var spotify           = require("./spotify");

// Loading environment configurations (.env file)
dotenv.load();
var token = process.env.SLACK_TOKEN || '';

// Initializations
var rtm = new RtmClient(token, {logLevel: 'live'});
rtm.start();

var app = {
  commandsAvailable: [
    'status', 'help', 'play', 'add', 'clear', 'queue', 'info', 'current'
  ],

  isAction: function(text) {
    return (_.indexOf(this.commandsAvailable, text) > -1);
  },

  executeAction: function(action, param, callback) {
    switch(action) {
    case "play":
      spotify.playTrack(function(val) {
        callback(val);
      });
      break;

    case "current":
      spotify.getCurrentTrack(function(track) {
        var response = "Current track: " + track.artist + " - " + track.name;
        callback(response);
      });
      break;
    }
  }
};

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  var response = "I am sorry, I didnt understand what you said, type help to see a list of available commands";
  var isAction = false;

  var command = message.text.split(" ");
  var action = command[0]; var param = command[1];

  if (app.isAction(action)) {
    app.executeAction(action, param, function(response) {
      rtm.sendMessage(response, message.channel, function messageSent() {});
    });
  }

  // reply with a message
  //rtm.sendMessage(response, message.channel, function messageSent() {
  // after message is sent log.
  //console.log("Message to " +message.channel+": " +response);
  //});

});

rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  console.log("M.C. Slack Bot is online.");
  console.log("");
  console.log("┏(-_-)┛ ┗(-_-﻿ )┓ ┗(-_-)┛ ┏(-_-)┓  PARTY TIME!");
  console.log("---------------------------------------------");
});

rtm.on(RTM_CLIENT_EVENTS.DISCONNECT, function() {
  console.log("¯\_(ツ)_/¯");
  console.log("M.C. Slack Bot disconnected, restart server to connect again.");
});

console.log("Initializing server..");
console.log("Starting..");
console.log("Connecting..");
