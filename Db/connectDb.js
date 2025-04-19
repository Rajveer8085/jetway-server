import mongoose from "mongoose";

const connectDb = async (uri) => {
 try {
    const options = {
        dbName:"jetway"
    }
   await mongoose.connect(uri,options)
 } catch (error) {
    console.log(error);
 }   
}

export default connectDb