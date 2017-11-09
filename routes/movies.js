var express = require("express");
var router = express.Router({mergeParams:true});
var movie = require("../models/movie");
var middleware = require("../middleware");

//index
router.get("/movies",function(req,res){

   movie.find({}, function(err,allmovies){
       if(err){
           console.log("Error!");
       }else {
           res.render("movies/index",{movies:allmovies,currentUser:req.user});
       }
   });

});
// create route
router.post("/movies",middleware.isLoggedIn,function(req,res){
   // res.send("posting works!");
    var name= req.body.name;
    var image =req.body.image;
    var desc = req.body.description;
    var author ={
        id: req.user._id,
        username: req.user.username
    };
    var movieObject =({name:name , image:image , description:desc,author:author});


    // create a new movie and save to DB
    movie.create(movieObject,function(err,movie){
       if(err){
           console.log(err);
       }else {
           console.log("Succesfully added movie!");
           console.log(movie);
             res.redirect("/movies");
       }
    });

});
// new form
router.get("/movies/new",middleware.isLoggedIn, function(req,res){
    res.render("movies/new");

});
// SHOW --> shows more information about a certain movie
router.get("/movies/:id",function(req,res){
     // find movie with ID
    movie.findById(req.params.id).populate("comments").exec(function(err,foundmovie){
        if(err){
            console.log(err);
        }else {
            console.log(foundmovie);
            res.render("movies/show",{movie:foundmovie});
            // under the name movie in the ejs, pass in foudnmovie var
        }
    });


//EDIT ROUTE
router.get("/movies/:id/edit",middleware.checkmovieOwnership,function(req,res){

        movie.findById(req.params.id,function(err,foundmovie){
            res.render("../views/movies/edit",{movie:foundmovie});
            });
    });



});


//UPDATE ROUTE
router.put("/movies/:id",middleware.checkmovieOwnership,function(req,res){
   movie.findByIdAndUpdate(req.params.id,req.body.movie,function(err,newmovie){
       if(err){
           console.log(err);
       } else {
           
           res.redirect("/movies/"+req.params.id);
       }
   });
});


// DELETE ROUTE
router.delete("/movies/:id",middleware.checkmovieOwnership,function(req,res){
   movie.findByIdAndRemove(req.params.id,function(err,Deletedmovie){
       if(err){
           console.log(err);
       } else {
           res.redirect("/movies");
       }
   });
});



module.exports = router;