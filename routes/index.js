var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// root route
router.get("/",function(req,res){
    res.redirect("/movies");
});


 // show register form
router.get("/register",function(req,res){
   res.render("register");
});
// handles signup logic
router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username}); // creates nnew user with only username( no pw, we get that next step)
    User.register(newUser,req.body.password,function(err,newUser){
        if(err){
            req.flash("error",err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to Movies" + newUser.username);
            res.redirect("/movies");
        });
    }); // registerring username , password
});

// LOgin 
router.get("/login",function(req,res){

   res.render("login");
});
// handles login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/movies",
        failureRedirect:"/login"
    }
    ),function(req,res){

    });


// logsout
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","you logged out!");
    res.redirect("/movies");
});


module.exports = router;