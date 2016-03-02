// Dependencies
var express = require('express');
var dotenv = require('dotenv');
var Slack = require('slack-node');

dotenv.load();

// Configurations
apiToken = process.env.SLACK_TOKEN;

// Initializations
var app = express();
slack = new Slack(apiToken);

// routes and responses
app.get('/', function (req, res) {

  slack.api('chat.postMessage', {
    text:'hello from nodejs',
    channel:'#random'
  }, function(err, response){
    console.log(response);
  });

  res.send('Server Running...!');
});


// Server Start
app.listen(3000, function () {
  console.log('MCSlack Server listening on port 3000!');
});
