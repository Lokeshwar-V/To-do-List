import { useState, useEffect } from "react";
const API_BASE = "http://localhost:3001";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
    console.log(todos);
  }, []);

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error:", err));
  };
  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id, {
      method: "PUT",
    }).then((res) => res.json());
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(API_BASE + "/todo/" + id, {
        method: "DELETE",
      }).then(() => {
        GetTodos();
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addTodo=async ()=>{
    const data=await fetch(API_BASE+"/todo/new",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        text:newTodo
      })
    }).then(res=>res.json());
  setTodos([...todos,data]);
  setPopupActive(false);
  setNewTodo("");
  }





  return (
    <div className="App">
      <h1>Welcome Back</h1>
      <h4>Your Tasks,</h4>
      <div className="todos">
        {todos.map((todo) => (
          <>
            <div
              className={"todo"}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div
                className={`checkbox  ${todo.complete && " checkbox-selected"}`}
              ></div>
              <div className={todo.complete ? "text" : ""}>{todo.text}</div>
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                X
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="addpopup" onClick={() => setPopupActive(true)}>
        +
      </div>
      {popupActive ? (
        <div className="popup">
          <div className="closepopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            ></input>{" "}
          </div>
          <div className="button" onClick={addTodo}>
            Create Task
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
