const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

require("dotenv").config({path:"../.env"});

const dbUrl=process.env.DB_URL;
main().then(()=>{
    console.log("Connected to db");
}).catch((err)=>{
    console.log("Db connection error",err);
})

async function main() {
    await mongoose.connect(dbUrl);
}
const initDb=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"69e55816196b859bda8823be"}));
    await Listing.insertMany(initdata.data);
    console.log("Data initlized complete");
}
initDb();