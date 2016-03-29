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
    'play', 'stop', 'next', 'prev', 'vol',
    'status', 'help', 'info', 'current'
  ],

  isAction: function(text) {
    return (_.indexOf(this.commandsAvailable, text) > -1);
  },

  executeAction: function(action, param, callback) {
    switch(action) {

    case "play":
      spotify.playTrack(param, function(val) {
        spotify.getCurrentTrack(function(track) {
          var response = "Now playing: " + track.artist + " - " + track.name;
          callback(response);
        });
      });
      break;

    case "next":
      spotify.next(function(val) {
        spotify.getCurrentTrack(function(track) {
          var response = "Now playing: " + track.artist + " - " + track.name;
          callback(response);
        });
      });
      break;

    case "prev":
      spotify.prev(function(val) {
        spotify.getCurrentTrack(function(track) {
          var response = "Now playing: " + track.artist + " - " + track.name;
          callback(response);
        });
      });
      break;

    case "stop":
      spotify.stop(function(val) {
        callback(val);
      });
      break;

    case "current":
      spotify.getCurrentTrack(function(track) {
        var response = "Current track: " + track.artist + " - " + track.name;
        callback(response);
      });
      break;

    case "vol":
      spotify.setVolume(param, function() {
        spotify.getState(function(vol) {
          var response = "Volume set at " + vol;
          callback(response);
        });
      });

      break;

    case "help":
      var help = `Commands available: play <spotify URI>, stop, next, prev, current, vol`;
      callback(help);
      break;
    }


  }
};

rtm.on(RTM_EVENTS.MESSAGE, function (message) {

  console.log(message);
  console.log("");

  if (message.type == 'message' && message.text != undefined) {
    var response = "I am sorry, I didnt understand what you said, type help to see a list of available commands";
    var isAction = false;

    var commandArray = message.text.split(" ", 2);
    var action = commandArray[0]; var param = commandArray[1];

    // clearning param from < > chars
    if (commandArray.length > 1) {
      param = param.replace(/</g, "");
      param = param.replace(/>/g, "");
    }

    if (app.isAction(action)) {
      app.executeAction(action, param, function(response) {
        rtm.sendMessage(response, message.channel, function messageSent() {});
      });
    }
    else {
      rtm.sendMessage(response, message.channel, function messageSent() {});
    }
  }

});

rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, function () {
  console.log("M.C. Slack Bot is online.");
  console.log("");
  console.log("┏(-_-)┛ ┗(-_-﻿ )┓ ┗(-_-)┛ ┏(-_-)┓  PARTY TIME!");
  console.log("---------------------------------------------");
});

rtm.on(RTM_CLIENT_EVENTS.ATTEMPTING_RECONNECT, function() {
  console.log("¯\_(ツ)_/¯ Disconnected. Attempting reconnect.." );
});

rtm.on(RTM_CLIENT_EVENTS.DISCONNECT, function() {
  console.log("¯\_(ツ)_/¯");
  console.log("M.C. Slack Bot disconnected, restart server to connect again.");
});

console.log("Initializing server..");
console.log("Starting..");
console.log("Connecting..");
