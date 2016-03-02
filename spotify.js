// spotify.js
// ========
var spotify = require('spotify-node-applescript');

module.exports = {
  playTrack: function () {
    spotify.playTrack('spotify:track:6S3cdO2t9jfs7KAfZAPieZ', function() {
    });
  },

  getCurrentTrack: function(callback) {
    console.log("spotify called");

    spotify.getTrack(function(err, track) {
      callback(track);
    });
  },

  stop: function() {
  },

  next: function() {
  }
};
