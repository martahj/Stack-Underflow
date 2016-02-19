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
    database: 'stack'
  }
});

var routes = express.Router();
routes.use(morgan('dev'));


// First set up sessions (independent of MakerPass and OAuth)
// This will give your middleware & endpoints access to req.session
//

routes.use(session({
  name: '_auth_session',
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
    console.log('got profile', profile._raw);
    // console.log('got done ', done);
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
routes.get('/auth/makerpass', //what is this? 
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
    res.redirect('/#/');
  });

//route to your index.html
var assetFolder = Path.resolve(__dirname, '../client/');
  routes.use(express.static(assetFolder));


// Route endpoints to listen for frontend requests
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'angular'])
});

routes.get('/api/questions/*', function(req, res) {
  console.log('Where are we?', req);
});

// Listen for post question req, send question information to the database, redirect to that question page
routes.post('/api/questions', function(req, res) {
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
      // })
    })
    .catch(function(err) {
      console.log(err);
    })
  })

});

if (process.env.NODE_ENV !== 'test') {
//The following GET request now works but only if the catch-all 
//route is commented out as well as routes.use below the assetFolder
// declaration. It works but I don't think it is correct
  // routes.get('/', function(req, res){
  //   if (!req.session.accessToken) {
  //     res.redirect('/auth/makerpass')
  //   } else {
  //     console.log('MPAUTH', MP.authWithSession());
  //     routes.use(express.static(assetFolder));
  //     res.sendFile( assetFolder + '/index.html' )
  //   }
  // });
  
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  // We're in development or production mode;
  // create and run a real server.
  var app = express();

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