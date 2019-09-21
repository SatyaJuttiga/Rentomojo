var express=require('express');
var router=express.Router();
var News=require('../models/news');
var Comment=require('../models/comment');


router.get('/news/:id/comments/new',isLoggedin,function(req,res){
    News.findById(req.params.id,function(err,news){
        if(err){
            console.log(err);
        }else{
            res.render('comments/new', { news: news});
        }
    });
});

router.post('/news/:id/comments',isLoggedin,function(req,res){
    News.findById(req.params.id,function(err,news){
        if(err){
            console.log(err);
            res.redirect('/news');
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                    res.redirect('/news');
                }else{
                    Comment.create(req.body.comment,function(err,comment){
                        if(err){
                            console.log(err);
                        }else{
                            news.comments.push(comment);
                            news.save();
                            res.redirect('/news/' + news._id);
                        }
                    })
                }
            });
        }
    });
});

router.get('/news/:id/comments/:comment_id/edit',function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if (err) {
            res.redirect("back");
        }else{
            res.render("comments/edit", { news_id: req.params.id ,comment:foundComment});
        }
    });
});

router.put("/news/:id/comments/:comment_id",function (req,res) {
     Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment) {
         if(err){
             res.redirect("back");
         }else{
             res.redirect("/news/" + req.params.id);
         }
     });
});

router.delete("/news/:id/comments/:comment_id",function (req,res) {
     Comment.findByIdAndRemove(req.params.comment_id,function(err){
         if(err){
             res.redirect("back");
         }else{
             res.redirect("/news/" + req.params.id)
         }
     });
});

function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err,foundComment) {
            if (err) {
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect('back');
                }
            }
        });
    } else {
        res.redirect('back');
    }
}

module.exports=router;
