import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import AddNewTodo from "./components/AddNewTodo.tsx";
import Navigation from "./components/Navigation.tsx";
import TodoDetails from "./components/TodoDetails.tsx";
import Welcome from "./components/Welcome.tsx";

export type Todo = {
  id:string
  description:string
  status:TodoStatus
}
export type TodoStatus= "OPEN" | "IN_PROGRESS" | "DONE"

function App() {

  const [data, setData] = useState<Todo[]>([])

  const fechData = ()=>{
    axios.get("/api/todo")
        .then(response=>{
          setData(response.data)})
        .catch(error=>alert(error.message))
  }

  useEffect(()=>{
      fechData()
  },[])
    
    function addNewTodoInData(newTodo:Todo){
      setData([...data,newTodo])
    }

  return (
    <>
        <Navigation/>
        <Routes>
            <Route path={"/"} element={<Welcome/>}/>
            <Route path="/addnewtodo" element={<AddNewTodo addNewTodoInData={addNewTodoInData}/>}/>
            <Route path={"/tododetails"} element={<TodoDetails todoList={data}/>}/>
        </Routes>


    </>
  )
}

export default App
