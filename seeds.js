var mongoose = require("mongoose"); // this is for mongo
var movie = require("./models/movie");
var Comment = require("./models/comment");
var data = [
    {name :"CLoud rrest",
    image : "https://farm4.staticflickr.com/3373/3600836516_ab924c6729.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium mauris turpis, ac condimentum mi aliquam sed. Quisque mollis, urna in molestie mattis, arcu turpis tincidunt libero, ac tincidunt ex erat id ante. Cras pharetra, sem in pharetra luctus, diam orci molestie elit, porta tempus odio felis nec quam. Vestibulum vel malesuada sapien. Cras vehicula, purus quis convallis aliquam, dui ante porta lectus, id consectetur turpis turpis imperdiet risus.  "

    },
      {name :"SheepDog",
    image : "https://farm3.staticflickr.com/2491/32423520270_175924d58a.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium mauris turpis, ac condimentum mi aliquam sed. Quisque mollis, urna in molestie mattis, arcu turpis tincidunt libero, ac tincidunt ex erat id ante. Cras pharetra, sem in pharetra luctus, diam orci molestie elit, porta tempus odio felis nec quam. Vestibulum vel malesuada sapien. Cras vehicula, purus quis convallis aliquam, dui ante porta lectus, id consectetur turpis turpis imperdiet risus.  "

    },
      {name :"Manager haircut",
    image : "https://farm5.staticflickr.com/4125/5172102774_3e4ce230d9.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pretium mauris turpis, ac condimentum mi aliquam sed. Quisque mollis, urna in molestie mattis, arcu turpis tincidunt libero, ac tincidunt ex erat id ante. Cras pharetra, sem in pharetra luctus, diam orci molestie elit, porta tempus odio felis nec quam. Vestibulum vel malesuada sapien. Cras vehicula, purus quis convallis aliquam, dui ante porta lectus, id consectetur turpis turpis imperdiet risus.  "

    }
    ];

function seedDB(){
    // remove all movies
        //movie.remove({},function(err){

       // });
        // add a few movies



}
module.exports = seedDB;
