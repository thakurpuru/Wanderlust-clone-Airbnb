const Listing=require("./models/listing.js");
const User=require("./models/user.js");
const Review=require("./models/review.js");
const ExpressError=require("./Utils/ExpressError.js");
const {reviewSchema}=require("./schema.js");
const {listingSchema}=require("./schema.js");


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in");
        return res.redirect("/user/login");
    }
    next();
}

module.exports.svaeRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;   
    }
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
        let listing=await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currUser._id)){
            req.flash("error","You are not owner of this listing");
            return res.redirect(`/listings/${id}`);
        }
        next();
}

module.exports.isloginWithGoogle=async(req,res,next)=>{
    let {username}=req.body;
    let user=await User.findOne({username});
    if(user && user.googleId && !user.hash){
        req.flash("error","Please Login with Google");
        return res.redirect("/user/signup");
    }
    next();
}

module.exports.validateReview=(req,res,next)=>{
    // console.log(req.body);
    let {id}=req.params;
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        req.flash("error",errMsg);
        return res.redirect(`/listings/${id}`);
    }else{
        next();
    }
};

module.exports.validateListing=(req,res,next)=>{
    
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id}=req.params;
    let {reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author");
        return res.redirect(`/listings/${id}`);
    }
    next();
};