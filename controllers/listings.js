const Listing=require("../models/listing.js");
const cloudinary=require("cloudinary");
module.exports.index=async(req,res)=>{
    let AllListing=await Listing.find(); 
    res.render("./listings/index.ejs",{AllListing});
}

module.exports.renderNewForm=(req,res)=>{
    res.render("./listings/new.ejs");
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exist");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing});

}
module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const listing=new Listing(req.body.listing);
    listing.image={filename,url};
    listing.owner=req.user._id;
    await listing.save(); 
    req.flash("succes","New Listing Created");
    res.redirect("/listings");
}

module.exports.renderEditForm=async(req,res)=>{
    let {id} =req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={filename,url};
        await listing.save();
    }
    req.flash("succes","Listing Updated");
    res.redirect(`/listings/${id}`);

}

module.exports.deleteListing=async(req,res)=>{
    let {id} =req.params;
    let listing= await Listing.findById(id);

    if(listing.image && listing.image.filename!=="listingimage"){
        await cloudinary.uploader.destroy(listing.image.filename);
    }
    await Listing.findOneAndDelete({_id:id}).then((res)=>{
        console.log(res);
    });
    req.flash("succes","Delete successfully");
    res.redirect("/listings");
}