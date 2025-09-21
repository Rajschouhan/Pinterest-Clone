var express = require('express');
var router = express.Router();

//3 -> jo humne 2 models banaye hai wo hum idhr require karnge ok.
const userModel = require("./users");
const postModel = require('./posts');
const passport = require('passport'); //pswd require
const upload = require("./multer");// 29

//setup pswd for authentication MEthodsm- TPYES-LocalStrategy , Google, Fb , JWt, Github, login etc.
//Method-localstategy - isme hum bas username or pswd se authenticate krte hai.
//pss.use() -> passport ko bolte h ki Aunthtication method register krlo
//
const  localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));  







/* GET home page. */  //PART-3-login
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//PART-3 register pge to show page .get
router.get("/register", function(req,res,next){
  res.render("register",{ title: "Register Page" });
});


//ye uncmmt krna h  : jb Submit hoga then .post , ynha ayga  isse user register hota
router.post("/register", function(req,res){
  const { username , email , fullname } = req.body ;
  const userData = new userModel({ username , email , fullname });
  
  userModel.register(userData, req.body.password).
  then(function(){
    passport.authenticate("local")(req,res, function(){  //agar user authenticate locally hogya hai then call back run kro jo ANDAR likha hai.
      res.redirect("/profile");
    })
  })
});
 




router.get("/login",function(req,res,next){

  res.render('login' , {error: req.flash('error')});
});





router.get("/feed", function(req,res,next){
  res.render('feed');
});



//29 -> route for uploading image using multer , uplod.singel is = middleware jo img ko handle krega.
router.post("/upload", isLoggedIn, upload.single('file'), async function(req,res,next){
  if(!req.file){
    res.status(404).send("no files were Given");
  }           //Linking to Database now ->31
      const user = await userModel.findOne({ username : req.session.passport.user}); // isse ek user milega jo login hai.
      const post = await postModel.create({
           img : req.file.filename ,                                                     // jb img uplod hui hai uska filename hoga.//
           imgText : req.body.filecaption ,                                              // caption jo user ne dala hoga wo hoga.
           user: user._id
   });

          user.posts.push(post._id);                                                    // user ke posts me post ki id push kr di.
          await user.save();
        res.redirect("/profile");
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



router.post("/login",passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/" ,
  failureFlash: true,
}), function(req,res,next){

} );



router.get("/logout", function(req,res){
     req.logout(function(err){
      if(err){ return next(err);}
      res.redirect("/");
     });
});



//25
router.get('/profile', isLoggedIn, async function(req,res,next){
    const  user = await userModel.findOne({
      username : req.session.passport.user
  })
  .populate("posts"); //populate kr k posts ka sara data mil jata hai.
                     // populate = populate se hum kisi dusre model ka data le skte hai.
        console.log(user);
        res.render("profile", { user });

}); 
 




 function isLoggedIn(req,res,next){
  if(req.isAuthenticated() ) return next();
  res.redirect("/");
 }

 

module.exports = router;
