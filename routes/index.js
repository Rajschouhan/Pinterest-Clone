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
// const { isValidElement } = require('react');
passport.use(new localStrategy(userModel.authenticate()));  


/* GET home page. */  //PART-3-login
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , nav: false});
});

//PART-3 register pge to show page [isse bas page show horha hai].get //signup
router.get("/register", function(req,res,next){
  res.render("register",{ title: "Register Page" , nav: false });
}); 


//ye uncmmt krna h  : jb Submit hoga then .post , ynha ayga  isse user register hota
router.post("/register", function(req,res){
  const { username , email , fullname } = req.body ;  // should match input : see vid- 47.30
  const userData = new userModel({ username , email , fullname });
  
  userModel.register(userData, req.body.password). //userdata^, pswd pass kiya.
  then(function(){
    passport.authenticate("local")(req,res, function(){  //agar user authenticate locally hogya hai then call back run kro jo ANDAR likha hai.
      res.redirect("/profile");
    })
  })
});

router.post("/fileupload", isLoggedIn, upload.single("image"), async function(req,res,next){
if(!req.file){
  res.status(404).send("no files were Given");
}

 const user = await  userModel.findOne({username :req.session.passport.user  })
 user.profileImage = req.file.filename;  //jo bhi dp file uplod hui h uska nam isme save hota hai.
 await user.save();
 res.redirect("/profile");
});

//29 -> route for uploading image using multer , uplod.singel is = middleware jo img ko handle krega.
 





//4 -> route for creating user


//5 -> making post route to create post data , we have to link post with user & we have to link user with post
// ie relationship bnaani hai dono models k beech me. & hamare pass get route bhi hai. that is get/profile

router.post("/createpost", isLoggedIn, upload.single("postimage"),  async function(req,res,next){
  const user = await userModel.findOne({username : req.session.passport.user });
  const post =  await postModel.create({
   user: user._id , //hamare paas user already h so just take id
    title : req.body.title ,
    description: req.body.description,
     
      img:req.file.filename
  }); 
  
  user.posts.push(post._id); //post id ko user k posts array me push krdo
  await user.save();
  res.redirect("/profile");
  
});

// router.get("/allposts", async function(req,res,next){
//   let user = await  userModel.findOne({ _id :"68a353b01f9abea8cd6628e2"}).populate("posts");
//   res.send(user);
// })

//THIS COMMENTED ROUTES WHERE JUST FOR DEVLOPER PURPOSE.
// NOW DEVLOPMENT CODE OF "PINTEREST" .



router.post("/login" ,passport.authenticate('local',{
  failureRedirect: '/',
  successRedirect:"/profile",

}),function(req,res,next){

} );

router.get("/logout", function(req, res,next) {
  req.logout(function(err){
    if(err){ return next(err); }
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
        res.render("profile", { user, 
    title: 'User Profile'  , nav: true } );

}); 

//user ko khud ki posts sari dikhegi
router.get('/show/posts', isLoggedIn, async function(req,res,next){
    const  user = await userModel.findOne({
      username : req.session.passport.user
  })
  .populate("posts"); //populate kr k posts ka sara data mil jata hai.
                     // populate = populate se hum kisi dusre model ka data le skte hai.
        console.log(user);
        res.render("show", { user, 
    title: 'User Profile'  , nav: true } ); //res.render me , show file ka naam h uske baad obj me data paas kiya hai.

}); 

//click pr singel post show hogi
router.get('/show/posts/:id', isLoggedIn, async function(req,res,next){
    const postId =  req.params.id ;
    const post = await postModel.findById(postId).populate('user'); //populate se hum user ka data le skte hai jo is post se linked hai.
      res.render("postData",{post,title:post.title, description:post.description , nav:true });

});  

//feed show hogi all users all posts
router.get('/feed', isLoggedIn , async function(req,res,next){
 const user = await userModel.findOne({username: req.session.passport.user});

 const allposts = await  postModel.find().populate('user'); //each post have an id of user jo usne post kiya hai.
   res.render("feed", { user, allposts , title:"Feed Page" , username: user.username , nav:true } );
});


router.get('/add', isLoggedIn , async function(req,res,next){
  const user = await userModel.findOne({
    username:req.session.passport.user
  });
  res.render("add" , {user ,title:req.body.title  , nav:true });
});
 

router.post('/post/:id/likes', isLoggedIn, async function(req,res,next){
    const post = await postModel.findById(req.params.id);
    const userId = req.user._id;

   // 🛡️ SAFETY CHECK
  if (!post.likes) {
    post.likes = [];
  }

    if(post.likes.includes(userId)){
      // User has already liked the post, so we remove the like
      post.likes.pull(userId);
    } 
    else{
      post.likes.push(userId);
    }

    await post.save();
    res.redirect('back');
});  

router.post('/post/:id/save', isLoggedIn , async function(req,res,next){
   const user = await userModel.findById(req.user._id);
   const postId = req.params.id ;

   if(user.savedPosts.includes(postId)){
    user.savedPosts.pull(postId);
   } else {
    user.savedPosts.push(postId);
   }
    await user.save();
    res.redirect('/saved');
})

router.get('/saved' , isLoggedIn , async function(req,res,next){
const user = await userModel.findById(req.user._id).populate('savedPosts');
res.render('saved', { user , title: 'saved Posts', nav: true});
})
 


 function isLoggedIn(req,res,next){
  if(req.isAuthenticated() ) return next();
  res.redirect("/");
 }

 

module.exports = router;
