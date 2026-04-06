const express=require("express");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const mongoose=require("mongoose");
const path=require("path");
const cors=require("cors");
const listingsRouter=require("./routes/listings.js");
const reviewsRouter=require("./routes/reviews.js");
const flash=require("connect-flash");
const session=require("express-session");
const localSStrategy=require("passport-local");
const User=require("./models/user.js");
const passport=require("passport");
const userRouter=require("./routes/user.js");
const GoogleStrategy=require("passport-google-oauth20").Strategy;
require("dotenv").config();

const app=express();

app.use(cors());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log("Db connection error",err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wander');
}

const sessionOption={
    secret:"mysupersecret",
    resave:false,
    saveUninitialized:true,
    cookie : {
        expires:Date.now()*7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    }

};


app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localSStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_clientID,
  clientSecret: process.env.GOOGLE_clientSecret,
  callbackURL: "http://localhost:3000/user/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {

  const email = profile.emails[0].value;

  // 🔥 Step 1: Check if user exists by email
  let user = await User.findOne({ email });

  if (user) {
    // 👉 User exists → link Google account
    if (!user.googleId) {
      user.googleId = profile.id;
      user.avatar = profile.photos[0].value;
      await user.save();
    }
    return done(null, user);
  }

  // 🔥 Step 2: Create new user (Google signup)
  user = new User({
    email,
    username: profile.displayName,
    googleId: profile.id,
    avatar: profile.photos[0].value
  });

  await user.save();

  return done(null, user);
}));



app.get("/",(req,res)=>{
    res.send("root link");
});

app.use((req,res,next)=>{
    res.locals.currUser=req.user;
    res.locals.success=req.flash("succes");
    res.locals.error=req.flash("error");
    next();
});


// app.get("/demoUser",async(req,res)=>{
//     const fakeUser= new User({
//         email:"studet@gmail.com",
//         username:"delta-student"
//     });
//     let registerUser= await User.register(fakeUser,"helloworld");
//     res.send(registerUser);
// });
app.use("/user",userRouter);
app.use("/listings",listingsRouter);

app.use("/listings/:id/reviews",reviewsRouter);




// app.all("/*",(req,res,next)=>{
//     next(new ExpressError(404,"Page not found"));
// });
app.use((err,req,res,next)=>{
    console.dir(err);
    let {status=500,message="Something went wrong"}=err; 
    res.status(status).render("error.ejs",{message});
});
app.listen(3000,()=>{
    console.log("Listening on port 8080");
});