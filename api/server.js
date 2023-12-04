const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Sai1:sai123@cluster0.qlqlmdp.mongodb.net/",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connected to db"))
.catch(console.error)

const Todo=require('./models/Todo');

app.get('/todos',async(req,res)=>{
    const todos=await Todo.find();
    res.json(todos);
});

app.get('/todo/new',(req,res)=>{

});

app.listen(3001,()=>console.log("Server started on port 3000"));