import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/shorter.js';
import cors from 'cors';

dotenv.config();

const { env } = process;
const PORT = env.PORT || 5050;
const origins = env.ORIGINS || 'http://localhost:3000'

const app = express();
app.use(cors({ origin: origins }))
app.use(express.urlencoded({ extended: false }));
app.use(json());
app.set('view engine', 'ejs');

// Function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // mongodb connection string
        await mongoose.connect(env.MONGO_URI);
        console.log('mongoDB connected.');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

// connect to mongoDB
connectDB();

app.use(router);

// start the server and listen on PORT
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});
