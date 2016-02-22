var jwt  = require('jwt-simple'),
    express = require('express');
    knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'stackdb_db'
  }
});

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username,
        password = req.body.password;

    

    // var findUser = Q.nbind(User.findOne, User);
    // findUser({username: username})
    //   .then(function (user) {
    //     if (!user) {
    //       next(new Error('User does not exist'));
    //     } else {
    //       return user.comparePasswords(password)
    //         .then(function(foundUser) {
    //           if (foundUser) {
    //             var token = jwt.encode(user, 'secret');
    //             res.json({token: token});
    //           } else {
    //             return next(new Error('No user'));
    //           }
    //         });
    //     }
      // })
      // .fail(function (error) {
      //   next(error);
      // });
  },

  signup: function (req, res, next) {
    //need to check db to see if user already exists
    //then need to compare password
    //

    var username  = req.body.username,
        password  = req.body.password;
        console.log('req.body', req.body)

  //       knex('users').insert({username: req.body.username, password: req.body.password})
  // .then(function(resp) {
    // query db to get userid of the question we just asked
    knex('users').where({username: req.body.username})
    .then(function(data) {
      console.log('res userctrl', data)
      console.log('res.length', data[0])
      if (data[0] === undefined) {
        knex('users').insert({username: req.body.username, password: req.body.password})
        .then(function(){
          return knex('users').where({username: req.body.username})
          .then(function (user) {
          // create token to send back for auth
          var token = jwt.encode(username, 'secret');
          console.log("TOKEN", token, "user:", user)
          console.log('resss', res.send)
          res.send({token: token});
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      }
    });
    // async, returns object within array
  //   .then(function(id) { var quest = id[0].questionid; return quest; })
  //   .then(function(questid) {
  //     console.log("we are getting questid ", questid);
  //     // routes.get('/api/questions/' + questid, function(req, res) {
  //     //   console.log('we are in questionid getting');
  //     res.send({questid: questid});
  //     // res.redirect('/#/main');
  //     // })
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   })
  // })
    //     create,
    //     newUser;

    // var findOne = Q.nbind(User.findOne, User);

    // // check to see if user already exists
    // findOne({username: username})
    //   .then(function(user) {
    //     if (user) {
    //       next(new Error('User already exist!'));
    //     } else {
    //       // make a new user if not one
    //       create = Q.nbind(User.create, User);
    //       newUser = {
    //         username: username,
    //         password: password
    //       };
    //       return create(newUser);
    //     }
    //   })
    //   .then(function (user) {
    //     // create token to send back for auth
    //     var token = jwt.encode(user, 'secret');
    //     res.json({token: token});
    //   })
    //   .fail(function (error) {
    //     next(error);
    //   });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    // var token = req.headers['x-access-token'];
    // if (!token) {
    //   next(new Error('No token'));
    // } else {
    //   var user = jwt.decode(token, 'secret');
    //   var findUser = Q.nbind(User.findOne, User);
    //   findUser({username: user.username})
    //     .then(function (foundUser) {
    //       if (foundUser) {
    //         res.status(200).send();
    //       } else {
    //         res.status(401).send();
    //       }
    //     })
    //     .fail(function (error) {
    //       next(error);
    //     });
    // }
  }
};
