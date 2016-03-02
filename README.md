# M.C. Slack
Lets your entire slack team control media played at the office using a nodejs server running in a host computer.

## Creating your bot
1. Create your bot at your control panel at slack.com
2. Save your generated SLACK TOKEN 

## Install server in local computer
1. This computer speakers will be playing the music
2. Download repo to a local folder `git@github.com:GerManson/MCSlack.git`
3. go to repository folder `cd path/to/folder`
4. Use template for your configuration file `cp .env.example .env`
5. Edit `.env` configuration file with your slack bot token
6. Run server `node app.js`
7. Server will connect to your slack team


## Usage
Search for bot on your slack team members and type help for a list of commands
