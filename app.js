//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Blogging is one of the best way of expressing your thoughts and feelings and at the same time, learning a lot.So,head over through this and happy blogging :)";
const aboutContent = "Hello!! I am Yash vardhan, your friend and a freshman at Indian Institute of Technology(Indian School of Mines), Dhanbad.I am a learner, trying to explore technology to its roots and hoping to get some opportunity int the field of web development and computer programming.";
const contactContent = "Feel free to contact me even if you have some cricket or politics to talk with :)";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-yash:Yash123@cluster0-1lje1.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post",postSchema);



app.get("/" , function(req , res){

  Post.find({},function(err, posts){
    res.render("home" , {
      StartingContent: homeStartingContent,
      posts: posts
    });
  });

});


app.get("/about" , function(req , res){
  res.render("about" , {about: aboutContent});
});

app.get("/contact" , function(req , res){
  res.render("contact" , {contact: contactContent});
});

app.get("/compose" , function(req , res){
  res.render("compose");
});

app.post("/compose" , function(req , res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});

app.get("/posts/:postId" , function(req , res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err,post){
    res.render("post" , {
      title: post.title,
      content: post.content
    });
  });
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started on port 3000");
});
