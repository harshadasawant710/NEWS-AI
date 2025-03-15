import mongoose from "mongoose";

const dbConnect = async () => {
    try{
        //const connection = await mongoose.connect('mongodb://127.0.0.1:27017/news-ai')
        const connection = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MONGODB Connected")
    }
    catch(error){
        console.log(error)
    }
   
}

export default dbConnect