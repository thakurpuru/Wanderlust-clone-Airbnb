const express=require("express");
const wrapAsync=require("../Utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middlewere");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage})
const router=express.Router();
const listingController=require("../controllers/listings.js");

router
    .route("/")
    //index route
    .get(wrapAsync(listingController.index))
    //create route
    .post(isLoggedIn,upload.single("listing[image][url]"),validateListing,wrapAsync(listingController.createListing));
    
// new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router
    .route("/:id")
    // show route
    .get(wrapAsync(listingController.showListing))
    //update route
    .put(isLoggedIn,isOwner,upload.single("listing[image][url]"),validateListing,wrapAsync(listingController.updateListing))
    // delete route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

// edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports=router;
