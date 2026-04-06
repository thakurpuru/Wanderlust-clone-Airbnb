const Listing=require("../models/listing.js");
const Review=require("../models/review.js");

module.exports.createReview=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById({_id:id});
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("succes","New Review Created");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReviews=async(req,res)=>{
    let {id}=req.params;
    let {reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.deleteOne({_id:reviewId});
    req.flash("succes","Review deleted");
    res.redirect(`/listings/${id}`);
}