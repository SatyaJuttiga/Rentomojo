var express=require('express');
    bodyparser=require('body-parser'),
    methodOverirde=require('method-override'),
    mongoose=require('mongoose'),
    expressSession=require('express-session'),
    passport=require('passport'),
    LocalStrategy=require('passport-local'),
    User=require('./models/user'),
    News=require('./models/news'),
    Comment=require('./models/comment'),
    seedDB=require('./seed');
var app=express();


const port = process.env.PORT || 8080;

var indexRoutes=require('./routes/index');
var newsRoutes=require('./routes/news');
var commentRoutes=require('./routes/comments');

mongoose.connect('mongodb://localhost/rentomojo');

app.set('view engine','ejs');
seedDB();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverirde('_method'));

app.use(require('express-session')({
    secret:'bhavna',
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.User;
    next();
});

app.use(indexRoutes);
app.use(newsRoutes);
app.use(commentRoutes);

//mongoose.connect(config.mongodb.dbURI,() => {
  //  console.log('connected to mongo db');
//});

app.listen(port,()=>{
    console.log('server started on port' + port);
});

