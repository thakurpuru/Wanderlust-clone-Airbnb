const express=require("express");
const wrapAsync=require("../Utils/wrapAsync.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middlewere.js");
const router=express.Router({mergeParams:true});

const reviewController=require("../controllers/reviews.js");

// create reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

// delete reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReviews));

module.exports=router;