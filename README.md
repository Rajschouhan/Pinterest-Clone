1 = sabse pahle hum 2 model banayenge , (schema) .......   IN   /ROUTES FOLDER WE HAVE THE .js  FILES THAT IS 2 USER  MODEL AND 1 IS THE Routes Pages FILE. (index.js)
USER (user.js) & POST (post.js) .  ..............    IN /VIEWS FOLDER WE HAVE THE ui PAGES FRONTEND CODE OF EACH PAGE IN EACH FILE. 
INKO REQUIRE KARNEGE YE 2 ROUTES H , INHE index.js ME LAYNEGE.
4 =  createUser Route banaynege         in index.js
5 =  createPost Route banayenge         in index.js
6 =  both user & post ko ek dusre ki ids denge.
7 = dropped db , now creating user ,passing user-id to post.
8 = now createpost me userfindone karnge uss id k basis pr or uss user k schema me post naam ka array banaya h humne usme wo id ko push kr denge.
9 = naya get request banaynge sari /allposts dekhne k liye  1 user ki , user find krenge by id then i\usse post pr populate karnge and post dekhnege.
//      ::  NOW WE WILL START THE PINTEREST PROJECT  :: ROADMAP =>
11 = /Route banynge 2 , jin par login and signup hoga.  [index.js]
12 = /profile hogi jispar apko , apki profile dikhegi & apke saveedd posts dikhenge, aur ek uploaded section hoga jo abhi nhi baadme banayenge.
13 = /feed section hoga , ynha par saari images hogi.
14 = /click hum click karke images open nd save kr paynege.
15 = /board/:boardname poora board dikhega. [ye sb route index.js me]         STEPS=> REAL PROJECT START:
16 = sabse pahle data models chiye , banaynge. [user,post] .

17 = we have USER model , now we will setup PASSPORT for Authentication. [if dont know how to setup go to GPT ].

18 = install passport. [index js] created a /register route for user to register.

19 = codepen se frontend Pinterest signup page bna kr edit kiya.

20 = /Routes banaye =>  / home , /register , /login , /logout , /profile.

21 = codepen se login page banaya , feed page banaya.

22 = ab profile page banaynge, codepen se pinterest jesa page se frontend bana liya , then BOOTSTRAP se ek card uthaya or profile pr niche rakh diya , jispr baad me tap krne se open hongi sari saved images user dwara.

23 = connect-flash install kiya and usko login fail route me lagaya bcoZ- agr login galat pswd se fail huwa to ek error msg de ki pswd galat h ya username ok.

24 = ab ye eroor msg kese dikhega jb error aygea wo pswd galat krega tb but wo agr direct /login page pr roue kr k aya to error ayega hi nhi bina kuch put kARE  then error length = 0, & agr galt dla pswd then error >0 so then EJS se Error Msgdikhai dega ok. 

25 = now we will , show user details when he is isLoggedIn on the profile page ok.[in profile route-index.js]

26 = How to create Actual Posts now ? => have post => *image , *caption & => MULTER- img uplod , caption 

27 = create a form in profile to take img uplod input.

28 = multer.js file banai - usme code likha from ss or multer.com & images me Uploads folder banaya

29 = NOW -> index.js  POST route banay -jab bhi UPLOAD hoga , agar koi file img nhi di to "NOT SUCCES" msg & agr FILE img di to "SUCCESS" msg.

30 = jo img uplod hogi uska extension name dena hoga , to require(path) , kr k denge . So = Upload hogyi hai,Now 31 me Link krenge , like db me save wgera .

31 = NOW , jo bhi img uplod hui hai use as a POST save kro , post ki id user ko denge & user id post ko di.

32 = isLoggedin user verify kiya , then agr file uplod hui h to => Post create ki or usme sara post ka data save kiya , fir uss particular post ko post array me push kiya & save kiya,                  humne abhi tak post upload kiya and usse save kr diya db me wo agya now,

33 = Now in /profile route [same index.js], hum     hamari post Profile pr show Karenge. Populate krna pdega , 
Hum USER profile me POST ka data layenge to .populate use karenge, or fir ejs use kr k profile ui me ek function banynge jisme foreach lga kr k sari user created posts dikha denge ok,