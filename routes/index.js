var express = require('express');
var router = express.Router();

//3 -> jo humne 2 models banaye hai wo hum idhr require karnge ok.
const userModel = require("./users");
const postModel = require('./posts');
const passport = require('passport'); //pswd require


//setup pswd for authentication
const  localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 
router.get("/login",function(req,res,next){

  res.render('login' , {error: req.flash('error')});
});

router.get("/feed", function(req,res,next){
  res.render('feed');
});

//4 -> route for creating user

// router.get('/createuser', async function (req,res ,next) {
//   let createduser = await userModel.create({
//     username: "Raj" ,
//     password: "abcd",
//     post:[],
//     email : "raj@gmail.com",
//     fullname : "Raj Singh" ,
//   });

//   res.send(createduser);
// })

//5 -> making post route

// router.get("/createposts", async function(req,res,next){
//   let createdpost =  await postModel.create({
//     postText : "This is a sample post one , kese ho",
//     user : "68a353b01f9abea8cd6628e2"
//   }); 
//   let user = await userModel.findOne({ _id: "68a353b01f9abea8cd6628e2"}) ;
//   user.posts.push(createdpost._id );  
//   await user.save();
//   res.send("Done");
  
// });

// router.get("/allposts", async function(req,res,next){
//   let user = await  userModel.findOne({ _id :"68a353b01f9abea8cd6628e2"}).populate("posts");
//   res.send(user);
// })

//THIS COMMENTED ROUTES WHERE JUST FOR PRACTISE.
// NOW DEVLOPMENT CODE OF "PINTEREST" .

router.post("/register", function(req,res){
  const { username , email , fullname} = req.body ;
  const userData = new userModel({ username , email , fullname });
  
  userModel.register(userData, req.body.password).
  then(function(){
    passport.authenticate("local")(req,res, function(){  //agar user authenticate locally hogya hai then call back run kro jo ANDAR likha hai.
      res.redirect("/profile");
    })
  })
});

router.post("/login",passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login" ,
  failureFlash: true,
}), function(req,res){

} );

router.get("/logout", function(req,res){
     req.logout(function(err){
      if(err){ return next(err);}
      res.redirect("/");
     });
});

router.get('/profile', isLoggedIn, function(req,res,next){
res.render("profile", { user: req.user, currentUser: req.user });
}); 
 
 function isLoggedIn(req,res,next){
  if(req.isAuthenticated() ) return next();
  res.redirect("/");
 }

 

module.exports = router;
