const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

main().then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log("Db connection error",err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wander');
}
const initDb=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"69b4dda9bef90178b3ef3e05"}));
    await Listing.insertMany(initdata.data);
    console.log("Data initlized complete");
}
initDb();