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
    app.use(bodyParser.urlencoded({extended: true})) //Needed for any form to post request
    app.use(require('express-session')({
        secret: 'J + D if you know what I mean',
        resave: false,
        saveUnitialized: false
    }));
    
    app.use(passport.intialize());
    app.use(passport.session());
    
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    //ROUTES
    
    //show sign up form
    app.get('/', function(req, res){
        res.render('home');
    });
    
    //handling user sign up
    app.post('/register', function(req, res){
        req.body.username;
        req.body.password;
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('register');
            }
            passport.authenticate('local')(req, res, function(){
              res.redirect('/secret');  
            });
        });
    });
    
    app.get('/secret', function(req, res){
        res.render('secret');
    });
    
    //Auth Routes
    app.get('/register', function(req, res){
        res.render('register');
    });
    
    //LOGIN ROUTES
    
    app.get('/login', function(req, res){
        res.render('login');
    });
    
    //login logic
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/secret',
        failureRedirect: '/login'
    }), function(req, res){
        
    })
    
    app.listen(process.env.PORT, process.env.IP, function(){
        console.log('server started...');
    });