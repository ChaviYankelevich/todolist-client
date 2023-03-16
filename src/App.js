import React, { useEffect, useState } from 'react';
import Login from './Login.js';
import Register from './Register.js';
import service from './service.js';
import { BrowserRouter } from 'react-router-dom'
import {Link, Route, Routes} from 'react-router-dom';


function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const todos = await service.getTasks();
    const userId=service.getLoginUser().id;
    console.log(todos)
    const filteredTodos = todos.filter(todo => todo.userId === userId);
    console.log(filteredTodos)
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo("");//clear input
    await getTodos();//refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();//refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();//refresh tasks list
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <BrowserRouter>
    <section className="todoapp">
      <header className="header">
      <div>
            <div>
     <Link to='/register'>הרשמה</Link><br/>
<Link to='/login'>כניסה</Link></div>
            <Routes>         
            <Route path='/register'  element={<Register/>}/>
            <Route path='login' element={<Login/>}/>       
            </Routes>
    </div>
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {

            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
     </BrowserRouter>
  );
}

export default App;