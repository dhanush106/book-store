import express, { response } from 'express'
import { monogoDBURL } from './config.js'
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';

const app = express()

//Middleware for parsing body request
app.use(express.json());


app.get('/',(req,res)=>{
    res.send("This is first route")
})

app.post('/books',async (request,res)=>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all required feilds : title, author , PublishYear",
            });
        }
        const newBook = {
            title : request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

app.get('/books',async (req,res)=>{
    try {
        const books = await Book.find({});
        
        return res.status(200).json({
            count:books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

app.get('/books/:id',async (req,res)=>{
    try {
        const { id } = req.params;
        const book = await Book.findById(id);;
        
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

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
  