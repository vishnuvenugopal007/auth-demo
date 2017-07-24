    var express                 = require('express');
    var mongoose                = require('mongoose');
    var passport                = require('passport');
    var bodyParser              = require('body-parser');
    var User                    = require('./models/user');
    var LocalStrategy           = require('passport-local');
    var passportLocalMongoose   = require('passport-local-mongoose')
    
    mongoose.connect('mongodb://localhost/auth_demo_app', {useMongoClient: true});
    

    
    var app = express();
    app.set('view engine', 'ejs');
    
    app.use(require('express-session')({
        secret: 'J + D if you know what I mean',
        resave: false,
        saveUnitialized: false
    }));
    
    app.use(passport.intialize());
    app.use(passport.session());
    
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    app.get('/', function(req, res){
        res.render('home');
    });
    
    app.get('/secret', function(req, res){
        res.render('secret');
    });
    
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log('server started...');
    })