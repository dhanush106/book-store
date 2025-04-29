import express from 'express'
import { monogoDBURL } from './config.js'
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
const app = express()

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

        const book = await Book.create(newBook)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})


mongoose.connect(monogoDBURL)
.then(()=>{
    console.log("App connected to Database");
    app.listen(3000,()=>{
        console.log("Port is running at 3000")
    });
}) 
.catch((error)=>{
    console.log(error);
    
})