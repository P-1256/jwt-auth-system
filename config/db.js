const mongoose = require("mongoose");

const connectDb = async()=>{
    
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected !");
    }
    catch(error){
        console.error("Database connection failed");
        process.exit(1);
    }

};

module.exports = connectDb;