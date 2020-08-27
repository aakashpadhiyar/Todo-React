import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuid from "react-uuid";

const LOCAL_STO_KEY = 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()
  const uqid = uuid()

  useEffect(() => {
    const storeTodos = JSON.parse(localStorage.getItem(LOCAL_STO_KEY))
    if (storeTodos) setTodos(storeTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STO_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(preTodos => {
      return [...preTodos, { id: uqid, name: name, completed: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo} >Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
      <p>Design By Aakash Padhiyar</p>
      <p><a href="https://twitter.com/KanoPadhiyar">twitter</a>, <a href="https://github.com/aakashpadhiyar">GitHub</a>, <a href="https://www.linkedin.com/in/aakashpadhiyar/">linkedin</a></p>
    </>
  );
}

export default App;
