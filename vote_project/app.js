var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportfb = require('passport-facebook').Strategy;
var session = require('express-session');
var db = require('./public/js/db_table_account');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret : "fdafjdsf"
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.get('/authen/fb' , passport.authenticate('facebook' , {scope : ['email']}));
app.get('/authen/fb/cb' , passport.authenticate('facebook',{
  failureRedirect: '/',
  successRedirect: '/',
  session: false
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Method passportfb using authen facebook
 */
passport.use(new passportfb(
  {
    clientID: "418017485293597",
    clientSecret: "1a3d43fda924f8283e8ce614e91e9ca7",
    callbackURL: "http://localhost:3000/authen/fb/cb",
    profileFields : ['email' , 'gender' , 'locale' , 'displayName']
  },
  (accessToken,refreshToken,profile,done) => {
    /**
     * Method get accessToken
     */
    console.log(accessToken);
    /**
     * Find all check all user if user exits in DB
     */
    db.findAll({
      where : {
        id_user: profile._json.id
      }
    }).then(account => {
      if(account == null || account == '' || account.length == 0) {
        db.create({
          fullName : profile._json.name,
          email : profile._json.email,
          id_user: profile._json.id
        });
        return done(null, account);
      } else {
        return done(null, account);
      }
    });
  }
));

/**
 * Find all check all user if user exits in DB
 */
passport.serializeUser((user,done) => {
  done(null,user.id);
});

/**
 * Find all check all user if user exits in DB
 */
passport.deserializeUser((id,done) => {
  db.findAll({
    where : {
      id_user: profile._json.id
    }
  }).then(account => {
    done(null,account);
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
