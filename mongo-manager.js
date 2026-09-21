import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const openMongoConnection = () => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log("connected to MongoDB");
    });
    mongoose.connect(process.env.MONGO_URI);
};

mongoose.set('strictQuery', true);

export default { openMongoConnection };