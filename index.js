"use strict";

const express = require('express');
const OAuth2 = require('oauth').OAuth2;
const Twitter = require('twitter');
const moment = require('moment');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/tweets.css', function(request, response) {
  //Auth
  const key = process.env.TWITTER_CONSUMER_KEY;
  const secret = process.env.TWITTER_CONSUMER_SECRET;
  let oauth2 = new OAuth2(key, secret, 'https://api.twitter.com/', null, 'oauth2/token', null);
  oauth2.getOAuthAccessToken('', {
      'grant_type': 'client_credentials'
    }, function (e, token) {
      if(e) throw e;
      //Auth Success get tweets
      let config = {
        consumer_key: key,
        consumer_secret: secret,
        bearer_token: token
      };
      let client = new Twitter(config);
      let params = { q: process.env.TWITTER_SEARCH_STRING };
      client.get('search/tweets.json', params)
        .then(function (tweets){
          let statuses = tweets.statuses;
          let css = ['@media screen and (-webkit-min-device-pixel-ratio: 0) {',
            '.tweet .copy:before {white-space: pre-wrap;',
            '}'];
          for (let i = 0; i < statuses.length; i++){
            let user = statuses[i].user;
            let avatar = user.profile_image_url_https;
            let name = user.name;
            let handle = user.screen_name;
            let timestamp = moment(new Date(statuses[i].created_at)).locale('es-MX').format('DD MMM');
            let copy = statuses[i].text.split('\n').join(' ');
            let id = '#tweet-' + (i + 1);

            let avatarcss = [id, ' .avatar {', 'background: url("', avatar, '");}'].join('');
            let namecss = [id, ' .name::before { content: "', name, '";}'].join('');
            let handlecss = [id, ' .handle::after { content: "', handle, '";}'].join('');
            let copycss = [id, ' .copy::before { content: "', copy, '";}'].join('');
            let timestampcss = [id, ' .timestamp::after { content: "',
              timestamp, '";}'].join('');
            css.push(avatarcss);
            css.push(namecss);
            css.push(handlecss);
            css.push(copycss);
            css.push(timestampcss);
          }
          response.setHeader('content-type', 'text/css');
          response.send(css.join(''));
        })
        .catch(function (error){
          throw error;
        });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
