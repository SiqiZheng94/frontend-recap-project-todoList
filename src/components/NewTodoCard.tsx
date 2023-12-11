import {ChangeEvent, FormEvent, useState} from "react";
import {TodoStatus} from "../App.tsx";
import axios from "axios";

type NewTodoCardProps={

}

export default function NewTodoCard(props:NewTodoCardProps) {
    const [inputDescription, setInputDescription] = useState<string>("")
    function changeDescription(event:ChangeEvent<HTMLInputElement>){
        setInputDescription(event.target.value)
    }


    const inputStatus:TodoStatus="OPEN"
    function submitNewTodo(){
        if(inputDescription){
            const newTodo = {
                description:inputDescription,
                status: inputStatus
            }
            axios.post("/api/todo",newTodo)
                //To know if a POST request was successful, you can rely on the response status code that the server sends back.
                //successful POST request typically returns a status code: 200
                .then((response)=>{
                    if(response.status===200) {
                        alert("Your new to-do item has been successfully created.")
                    } else {
                        alert("Post request failed! "+response.status)
                    }
                })
                .catch((error)=>alert(error.message))
        } else {
            alert("Please provide a description for the new todo.")
        }
        setInputDescription("")
    }

    return (
        <div className={"todo-card new-todo"}>
            <input type={"text"}
                   placeholder={"description"}
                   value={inputDescription}
                   onChange={changeDescription}/>
            <button onClick={submitNewTodo}>Save</button>
        </div>
    );
}

