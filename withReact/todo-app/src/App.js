import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () =>{
    // Add Tasks
    const todoName = todoNameRef.current.value;
    if(todoName === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: todoName, isCompleted:false}];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo => todo.id === id));
    todo.isCompleted = !todo.isCompleted;
    setTodos(newTodos);
  };

  const handleClear = () =>{
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(newTodos);
  };

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add Tasks</button>
      <button onClick={handleClear}>Delete Tasks</button>
      <div>Remaining Tasks:{todos.filter((todo) => !todo.isCompleted).length}</div>
    </div>
  );
};

export default App;
