import {useEffect, useState} from 'react'
import './App.css'
import axios from "axios";
import TodoColumn from "./components/TodoColumn.tsx";

export type Todo = {
  id:string
  description:string
  status:TodoStatus
}
export type TodoStatus= "OPEN" | "IN_PROGRESS" | "DONE"

const allPossibleTodos:TodoStatus[]=["OPEN", "IN_PROGRESS", "DONE"]

function App() {

    const [data, setData] = useState<Todo[]>()



  const fetchData = ()=>{
    axios.get("/api/todo")
        .then(response=>{
          setData(response.data)
        })
        .catch(error=>alert(error.message))
  }

  useEffect(()=>{
      fetchData()
  },[data])


    // if data is undefined, null ==>falsy, then return a message but not render
    if (!data){
        return "Loading..."
    }
    // if data is fetched, then render
  return (
    <>
        <div className={"page"}>
            <h1>TODOs</h1>
            {
                allPossibleTodos.map(status=>
                 {
                    const filteredTodos= data.filter(data=>data.status===status)
                    return <TodoColumn status={status} todos={filteredTodos} getDatas={fetchData}/>
                })
            }
        </div>
    </>
  )
}

export default App
