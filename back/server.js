import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import {UrlModel} from './models/urlModel';

const PORT = process.env.PORT || 5000;
const app = express();

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // mongodb connection string
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongoDB connected.');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

// connect to mongoDB
// connectDB();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for handling JSON, URL-encoded data, and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


// start the server and listen on PORT 7000
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});
