const User=require("../models/user");

module.exports.renderSingUpForm=(req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.userSingUp=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        const newUser= new User({email,username});
        let registerUser=await User.register(newUser,password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("succes","Welcome to Wanderlust!");
            res.redirect("/listings");
        })
    }catch(er){
        req.flash("error",er.message);
        res.redirect("/user/signup");
    }   
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("./users/login.ejs");
}

module.exports.userLogin=(req,res)=>{
    req.flash("succes","Welcome back to Wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings"; 
    console.log(redirectUrl);
    res.redirect(redirectUrl);
}

module.exports.userLogout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("succes","You are logged out");
        res.redirect("/listings");
    });
}

module.exports.googleCallback=(req, res) => {
    req.flash("succes","Logged in successfully");
    res.redirect("/listings");
}