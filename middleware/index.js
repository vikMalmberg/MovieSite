var middlewareObj= {};
var Comment = require("../models/comment");
var movie = require("../models/movie");

middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","this is the error message!");
    res.redirect("/login");
};
middlewareObj.checkCommentOwnership = function (req,res,next){
       if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        } else{
            if(foundComment.author.id.equals(req.user._id)){
            next();
            } else{
                res.redirect("back");
            }
        }
    });

    }else {
        res.redirect("back");
    }
};
middlewareObj.checkmovieOwnership = function (req,res,next){
       if(req.isAuthenticated()){

         movie.findById(req.params.id,function(err,foundmovie){
        if(err){
            res.redirect("back");
        } else{
            if(foundmovie.author.id.equals(req.user._id)){
            next();
            } else{
                res.redirect("back");
            }
        }
    });

    }else {
        res.redirect("back");
    }
};



module.exports = middlewareObj;