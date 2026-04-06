const express=require("express");
const ejs=require("ejs");
const path=require("path");
const session=require("express-session");
const flash=require("connect-flash");
const app=express();


const sessionOption={
    secret:"mysupersecret",
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionOption));
app.use(flash());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.get("/register",(req,res)=>{
    let {name="anonoymas"}=req.query;
    req.session.name=name;
    req.flash("succes","user register succesfully");
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.locals.msg=req.flash("succes")
    res.render("page.ejs",{name:req.session.name});
})

// app.get("/test",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`your session coun${req.session.count}`);
// })



app.listen(3000,()=>{
    console.log("Listening on port 3000");
});