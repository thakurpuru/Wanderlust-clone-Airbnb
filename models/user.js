const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose").default;

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    avatar: String
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);