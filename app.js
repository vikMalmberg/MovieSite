/* jshint node: true */
"use strict";
// reserv
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var movie = require("./models/movie");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var http = require("http");


var commentRoutes = require("./routes/comments");
var movieRoutes = require("./routes/movies");
var authRoutes = require("./routes/index");


//seedDB();
var server = http.createServer(app);

mongoose.connect("mongodburl");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+ "/public"));
app.set("view engine" ,"ejs");
app.use(methodOverride("_method"));
app.use(flash());
// Configure passport
//====================================
app.use(require("express-session")({
    secret:"zzz baat",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//====================================
//====================================

// To get the currentUser : req.user in all views
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use(commentRoutes);
app.use(movieRoutes);



server.listen(3000, 'localhost');
server.on('listening', function () {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});