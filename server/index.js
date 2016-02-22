var express = require('express');
var Path = require('path');
var sass = require('node-sass-endpoint');
var session = require('cookie-session');
var MP = require('node-makerpass');

var db  = require('./db');

var morgan  = require('morgan');
var Promise = require('bluebird');

// need to require knex to use the functions for DB
var knex = require('knex')({
  client: 'pg',
  connection: {
    database: 'stackdb_db'
  }
});

var routes = express.Router();
//routes.use(morgan('dev'));


// First set up sessions (independent of MakerPass and OAuth)
// This will give your middleware & endpoints access to req.session
//

routes.use(session({
  name: 'underflow:session',
  secret: process.env.SESSION_SECRET || 'development',
  secure: (!! process.env.SESSION_SECRET),
  signed: true
}));

//
// Now set up passport.
// Authenticate with MakerPass, and attach accessToken to session.
//
var passport = require('passport');
var MakerpassStrategy = require('passport-makerpass').Strategy;

passport.use(new MakerpassStrategy({
    clientID: process.env.MAKERPASS_CLIENT_ID,
    clientSecret: process.env.MAKERPASS_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/makerpass/callback",
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    // console.log('got req', req);
    console.log("GOT TOKEN:", accessToken)
    // console.log('got refreshToken', refreshToken);
    console.log('got profile', profile);
    // console.log('got done ', done);
    // req.localStorage.setItem('session', accessToken);
    req.session.accessToken  = accessToken;
    req.session.refreshToken = refreshToken;


    done(null, 1);  // Necessary only for serializeUser (see below)
  }
));

//
// Attach Passport to the app
//
routes.use(passport.initialize())

//
// We don't need serializeUser/deserializeUser,
// but passport will break if we don't write this.
//
passport.serializeUser(function(_, done) { done(null, 1) })

//
// Direct your browser to this route to start the OAuth dance
//

routes.get('/auth/makerpass',
  passport.authenticate('makerpass'));

//
// During the OAuth dance, MakerPass will redirect your user to this route,
// of which passport will mostly handle.
//

routes.get('/auth/makerpass/callback',
  passport.authenticate('makerpass', { failureRedirect: '/#/login',
  failFlash: true }),
  function(req, res) {
    console.log("WORKING")
    // Successful authentication, do what you like at this point :)
    routes.use(express.static(assetFolder));
    res.redirect('/');
  });

//route to your index.html
var assetFolder = Path.resolve(__dirname, '../client/');
  routes.use(express.static(assetFolder));


// Route endpoints to listen for frontend requests
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'angular'])
});

routes.get('/api/questions', function(req, res) {
    console.log("REQ.seesion", req.session.accessToken)
    if (!req.session.accessToken) {
      // throw new Error("NEIN")
      // console.log('res.redircect', res)
      // res.redirect('/auth/makerpass')
      // res.send({redirect: '/auth/makerpass'});
    }
  console.log("getting all questions");
  knex('questions').select()
  .then(function(questions) {
    res.send({questions: questions});
  })
  .catch(function(err) {
    console.log("Error", err)
    res.redirect('/auth/makerpass')
  })
});

routes.get('/api/questions/*', function(req, res) {
console.log("REQ.seesion", req.session.accessToken)
  console.log('Where are we?', req);
  console.log('Requestid???', req.params[0]);
  knex('questions').where({questionid: req.params[0]})
  .then(function(singleQuest) {
    console.log("We have gotten a question", singleQuest);
    res.send({singleQuestion: singleQuest});
  })
  .catch(function(err) {
    console.log("Something went wrong", err);
  })
});

// Listen for post question req, send question information to the database, redirect to that question page
routes.post('/api/questions', function(req, res) {
  console.log("REQ.seesion", req.session.accessToken)
  console.log("REQ.User", req.user)
  console.log("In post in index.js", req.body.title);
  knex('questions').insert({questiontitle: req.body.title, questiontext: req.body.text})
  .then(function(resp) {
    // query db to get questionid of the question we just asked
    knex('questions').where({questiontext: req.body.text}).select('questionid')
    // async, returns object within array
    .then(function(id) { var quest = id[0].questionid; return quest; })
    .then(function(questid) {
      console.log("we are getting questid ", questid);
      // routes.get('/api/questions/' + questid, function(req, res) {
      //   console.log('we are in questionid getting');
      res.send({questid: questid});
      // res.redirect('/#/main');
      // })
    })
    .catch(function(err) {
      console.log(err);
    })
  })

});

//Deletes the session and redirects to login page.
routes.get('/logout', function(req, res) {
  console.log("REQ.seesion", req.session.accessToken)
  req.session = null;
  res.redirect('/login')
})

// routes.get('/login', function(req, res) {
//   routes.use('/auth/makerpass')
// })

if (process.env.NODE_ENV !== 'test') {
//The following GET request now works but only if the catch-all 
//route is commented out as well as routes.use below the assetFolder
// declaration. It works but I don't think it is correct
  
  
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  // We're in development or production mode;
  // create and run a real server.
  var app = express();
  // configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() );

  // This compiles your Sass files
  // Remember to change file paths or directories
  app.get(
    '/main.css',
    sass.serve('./client/sass/main.scss', {

      // (dev only) defaults to parent folder of scss file.
      // Any sass file changes in this directory will clear the output cache.
      watchDir: './client/sass/',

      // defaults to parent folder of scss file
      includePaths: ['./client/sass/'],

      // defaults to false
      debug: false
    })
  )

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  var port = process.env.PORT || 4000;
  app.listen(port);
  console.log("Listening on port", port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}