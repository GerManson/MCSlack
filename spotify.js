// spotify.js
// ========
var spotify = require('spotify-node-applescript');

module.exports = {
  playTrack: function (trackId, callback) {
    spotify.playTrack(trackId, function() { callback(); });
  },

  getCurrentTrack: function(callback) {
    spotify.getTrack(function(err, track) {
      callback(track);
    });
  },

  stop: function(callback) {
    spotify.pause(function() {
      callback("No stop function for shopify, used pause instead");
    });
  },

  next: function(callback) {
    spotify.next(function() {
      callback("Playing next song..");
    });
  },

  prev: function(callback) {
    spotify.previous(function() {
      callback("Playing previous song..");
    });
  },

  setVolume: function(volume, callback) {
    spotify.setVolume(volume, function(res) {
      callback(res);
    });
  },

  getState: function(callback) {
    spotify.getState(function(err, state) {
      console.log(state);
      callback(state.volume);
    });
  }

};
