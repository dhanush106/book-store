import express from 'express'

const app = express()

app.get('/',(req,res)=>{
    res.send("This is first route")
})

app.listen(3000,()=>{
    console.log("Port is running at 3000")
})