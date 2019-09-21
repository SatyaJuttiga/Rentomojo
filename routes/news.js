var express=require('express');
var router=express.Router();
var News=require('../models/news');

router.get('/news',function(req,res){
    console.log(req.user);
    News.find({},function(err,allnews){
        if(err){
            console.log(err);
        }else{
            res.render('news/index', { allnews: allnews,currentUser: req.user});
        }
    });
});

router.post('/news',isLoggedin,function(req,res){
    var name=req.body.name;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newNews={name:name,description:desc,author:author}
    News.create(newNews,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect('/news');
        }
    });});

router.get('/news/new',isLoggedin,function(req,res){
    res.render('news/new');
});


router.get('/news/:id',function(req,res){
    News.findById(req.params.id).populate('comments').exec(function(err,foundNews){
        if(err){
            console.log(err);
        }else{
            res.render('news/show', { news: foundNews});
        }
    });
});


function isLoggedin(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/login');
}


module.exports=router;
