import {Todo, TodoStatus} from "../App.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

type TodoDetailProps = {
    todoList:Todo[]
}
export default function TodoDetail(props:TodoDetailProps){
    const pathId=useParams().id
    const selectedTodo= props.todoList.find(todo=>todo.id===pathId)
    const [todo, setTodo] = useState<Todo>({id : "100", description : "test", status:"OPEN"})
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [inputDescription, setInputDescription] = useState<string>("")
    const [inputStatus, setInputStatus] = useState<TodoStatus>("")

    useEffect(() => {
        selectedTodo ? setTodo(selectedTodo) : console.log("NOT FOUND!")
    }, [pathId, selectedTodo]);

    function saveChange (){
        const updatedTodo:Todo={
            id:todo.id,
            description:inputDescription,
            status:inputStatus
        }
        axios.put("/api/todo/"+pathId+"/update",)
    }

    return (
        <>
            <h2>TodoDetail Page</h2>
            {isEditing ? (
                <>
                    <div>
                     <input
                        type={"text"}
                        placeholder={"description"}
                        value={inputDescription}
                        onChange={event =>setInputDescription(event.target.value) }
                    />
                    </div>
                    <div>
                    <input
                        type={"text"}
                        placeholder={"status"}
                        value={inputStatus}
                        onChange={event =>setInputStatus(event.target.value) }
                    />
                    </div>
                    <button>Submit</button>
                </>
            ):(
                <>
                    <p>{todo.id}</p>
                    <p>{todo.description}</p>
                    <p>{todo.status}</p>
                    <button onClick={()=>setIsEditing(true)}>Edit</button>
                </>
            )}


        </>
    )
}