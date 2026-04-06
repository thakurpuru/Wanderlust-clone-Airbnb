const joi=require("joi");

module.exports.listingSchema=joi.object({
    listing: joi.object({
        title:joi.string().trim().min(1).required(),
        description:joi.string().trim().min(1).required(),
        country:joi.string().trim().min(1).required(),
        location:joi.string().trim().min(1).required(),
        price:joi.number().min(0).required(),
        image:joi.object({
            url:joi.string().allow("",null)
        }).optional()
    }).required()
});
 

module.exports.reviewSchema=joi.object({
    review : joi.object({
        rating:joi.number().min(1).max(5).required(),
        comment:joi.string().trim().min(5).required()
    }).required()
});