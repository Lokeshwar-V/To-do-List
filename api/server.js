const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://Sai1:sai123@cluster0.qlqlmdp.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch(console.error);

const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todo/new", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  await todo.save();
  res.send(todo);
});

app.delete("/todo/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(204).send("Deleted");
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

app.put("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "User not found" });
  } else {
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
  }
});

app.listen(3001, () => console.log("Server started on port 3000"));
