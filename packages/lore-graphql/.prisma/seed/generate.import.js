const _ = require('lodash');
const userTweets = require('./tweets.json');
const moment = require('moment');
const fs = require('fs');
const scuid = require('scuid');

/**
 * Example data
 */

// {
//   "valueType": "nodes",
//   "values": [
//   {
//     "_typeName": "Tweet",
//     "id": "cjy0yfbiy0000fh10r900896h",
//     "text": "Ayla fight while alive! Win and live. Lose and die. Rule of life. No change rule.",
//     "createdAt": "2019-07-13T00:04:42.579Z"
//   }
// ]
// }
//
// {
//   "valueType": "relations",
//   "values": [
//   [
//     {
//       "_typeName": "Tweet",
//       "id": "cjy0yfbiy0000fh10r900896h",
//       "fieldName": "user"
//     },
//     {
//       "_typeName": "User",
//       "id": "cjwo9j3db64qf0b12v1bbyawj"
//     }
//   ]
// ]
// }

function getTweetsFor(user, offset) {
  var timestamp = moment();
  return userTweets[user.nickname].map(function(tweet) {
    return {
      _typeName: 'Tweet',
      id: scuid(),
      user: user,
      text: tweet,
      createdAt: timestamp.subtract(3, 'hours').subtract(offset, 'minutes').toJSON()
    };
  });
}

function getRelations(tweets) {
  return tweets.map(function(tweet) {
    const user = tweet.user;
    delete tweet.user;

    return [
      {
        _typeName: 'Tweet',
        id: tweet.id,
        fieldName: 'user'
      },
      {
        _typeName: 'User',
        id: user.id
      }
    ]
  })
}

const users = [
  {
    id: "cjwo9j3db64qf0b12v1bbyawj",
    authId: 'auth0|57f1e2ad68e2b55a013258cd',
    nickname: 'ayla',
    avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027069/a356e82a-88e1-11e6-87d8-e3e74f55c069.png'
  },
  {
    id: "cjwo9j3do64qj0b12pnz3og33",
    authId: 'auth0|57f1e2bc5326643b67959d15',
    nickname: 'crono',
    avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027070/a3659c76-88e1-11e6-8434-5d66c70956c7.png'
  },
  {
    id: "cjwo9j3e264qn0b124t9ba7el",
    authId: 'auth0|57f1e2cf68e2b55a013258d6',
    nickname: 'frog',
    avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027071/a36ef028-88e1-11e6-9756-5e35b6fed834.png'
  },
  {
    id: "cjwo9j3ee64qr0b12uu6z3tbq",
    authId: 'auth0|57f1e2e05326643b67959d1a',
    nickname: 'lucca',
    avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027072/a36f0c7a-88e1-11e6-931e-7f67fe01367b.png'
  },
  {
    id: "cjwo9j3eo64qv0b12ptv44kdl",
    authId: 'auth0|57f1e30368e2b55a013258df',
    nickname: 'magus',
    avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027073/a36f67f6-88e1-11e6-9168-7687083cb994.png'
  },
  {
    id: "cjwo9j3f064qz0b12476p65oj",
    authId: 'auth0|57f1d0c55461dea8581fa42b',
    nickname: 'marle',
    avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
  },
  {
    id: "cjwo9j3fc64r30b12ekcaxe11",
    authId: 'auth0|57f1e30d68e2b55a013258e0',
    nickname: 'robo',
    avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027075/a3719e2c-88e1-11e6-9abe-5186abc4b04d.png'
  }
];

var ayla = _.find(users, {nickname: 'ayla'});
var crono = _.find(users, {nickname: 'crono'});
var frog = _.find(users, {nickname: 'frog'});
var lucca = _.find(users, {nickname: 'lucca'});
var magus = _.find(users, {nickname: 'magus'});
var marle = _.find(users, {nickname: 'marle'});
var robo = _.find(users, {nickname: 'robo'});

var tweets = {
  valueType: 'nodes',
  values: _.flatten([
    getTweetsFor(ayla, 0),
    getTweetsFor(marle, 1),
    getTweetsFor(frog, 2),
    getTweetsFor(lucca, 3),
    getTweetsFor(robo, 4),
    getTweetsFor(magus, 5),
    getTweetsFor(crono, 6)
  ])
};

var relations = {
  valueType: 'relations',
  values: getRelations(tweets.values)
};

const outputFilename1 = './import.tweets.json';
const outputFilename2 = './import.relations.json';

fs.writeFile(outputFilename1, JSON.stringify(tweets, null, 2), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + outputFilename1);
  }
});

fs.writeFile(outputFilename2, JSON.stringify(relations, null, 2), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + outputFilename2);
  }
});
