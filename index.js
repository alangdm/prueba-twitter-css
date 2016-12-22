const express = require('express');
const OAuth2 = require('OAuth').OAuth2;
const Twitter = require('twitter');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/twitter.css', function(request, response) {
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
          let css = [];
          for (let i = 0; i < statuses.length; i++){
            let user = statuses[i].user;
            let avatar = user.profile_image_url_https;
            let name = user.name;
            let handle = user.screen_name;
            let timestamp = statuses[i].created_at;
            let copy = statuses[i].text;
            let info = {avatar: avatar, name: name, handle: handle,
              timestamp: timestamp, copy: copy};
            css.push(info);
          }
          response.send(css);
        })
        .catch(function (error){
          throw error;
        });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
