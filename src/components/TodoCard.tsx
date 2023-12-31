import {Todo, TodoStatus} from "../App.tsx";
import axios from "axios";
import {ChangeEvent, useState} from "react";
type TodoCardProps={
    todo:Todo
    getDatas:()=>void
}
export default function TodoCard(props:TodoCardProps){
    const [edit, setEdit] = useState<boolean>(false)
    const [inputDescription, setInputDescription] = useState<string>()
    function deleteThisItem(){
        axios.delete("/api/todo/"+props.todo.id)
            // get all todos from backend, to reload the site
            .then(props.getDatas)
    }
    function inputOnchange(event:ChangeEvent<HTMLInputElement>){
        setInputDescription(event.target.value)
    }
    function editSwitch(){
        setEdit(!edit)
    }
    function updateThisItem(){
        axios.put("/api/todo/"+props.todo.id,{
            id:props.todo.id,
            description:inputDescription,
            status:props.todo.status
        } as Todo)
            .then(props.getDatas)
        editSwitch()
    }
    function move(targetStatus:TodoStatus){
        axios.put("/api/todo/"+props.todo.id,{
            id:props.todo.id,
            description:props.todo.description,
            status:targetStatus
        } as Todo)
            .then(props.getDatas)
    }

    return(
        <>
            {edit ?
                <div className={"todo-card"}>
                    <input
                        type={"text"}
                        placeholder={props.todo.description}
                        value={inputDescription}
                        onChange={inputOnchange}/>
                    <button onClick={updateThisItem}>Submit</button>
                </div>
            :
                <div className={"todo-card"}>
                    <p>{props.todo.description}</p>
                    <div>
                        {
                            props.todo.status==="OPEN"
                            ? <div></div>
                            :
                                    props.todo.status==="IN_PROGRESS"
                                ? <button onClick={()=>move("OPEN")}>{`<`}</button>
                                    :<button onClick={()=>move("IN_PROGRESS")}>{`<`}</button>
                        }
                        <button onClick={editSwitch}>Edit</button>
                        <button onClick={deleteThisItem}>Delete</button>
                        {
                            props.todo.status==="DONE"
                            ? <div></div>
                                : props.todo.status==="OPEN"
                                    ? <button onClick={()=>move("IN_PROGRESS")}>{`>`}</button>
                                    : <button onClick={()=>move("DONE")}>{`>`}</button>
                        }

                    </div>
                </div>
            }

    </>
    )
}