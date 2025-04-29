import express, { response } from 'express'
import { monogoDBURL } from './config.js'
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express()

//Middleware for parsing body request
app.use(express.json());

//Middleware for use of CORS
app.use(cors());

app.get('/',(req,res)=>{
    res.send("This is first route")
})

app.use('/books',booksRoute)

mongoose.connect(monogoDBURL, {
    tlsAllowInvalidCertificates: false, // Keep this false for production
    tlsAllowInvalidHostnames: false,   // Keep this false for production
    retryWrites: true,
    w: 'majority'
  })
  .then(() => {
    console.log("App connected to Database");
    app.listen(3000, () => {
      console.log("Port is running at 3000")
    });
  }) 
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
  