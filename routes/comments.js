    var express = require("express");
var router = express.Router();
var movie = require("../models/movie");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//Comments new
router.get("/movies/:id/comments/new",middleware.isLoggedIn,function(req,res){
    // find movie by id and send when render
    movie.findById(req.params.id,function(err,foundmovie){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{movie:foundmovie});
        }
    });

});

// Comments create
router.post("/movies/:id/comments",middleware.isLoggedIn,function(req,res){



   // lookup movie by id
   movie.findById(req.params.id,function(err,foundmovie){
       if(err){
           console.log(err);
       } else { // here we are creating the comment from whats in the fields!
          Comment.create(req.body.comment,function(err,comment){
              // and here we are associating the comment to the relevant movie
              if(err){
                  console.log(err);
              } else {
                  // adding to the comments ( in models/movie)
                  // add username and ID to comment
                  console.log(req.user.username);
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  // save comment
                  comment.save();

                  foundmovie.comments.push(comment);
                  foundmovie.save();
                  res.redirect("/movies/" +foundmovie._id);
              }
          });
       }
   });


});

// EDIT COMMENT
router.get("/movies/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
       if(err){
           res.redirect("back");
       } else{
           res.render("comments/edit",{movie_id :req.params.id, comment:foundComment});
               // is the .render always starting in view? i think so?
       }
    });

});


// UPDATE comment
router.put("/movies/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            console.log("error!");
        } else {
             res.redirect("/movies/" +req.params.id);
        }
    });

});
// DELETE comment
router.delete("/movies/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,deletedComment){
        if(err){
            console.log("error");
        } else {
            res.redirect("/movies/" + req.params.id);
        }
    });
});




module.exports= router;