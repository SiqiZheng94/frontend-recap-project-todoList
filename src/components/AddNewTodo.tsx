import {ChangeEvent, FormEvent, useState} from "react";
import {Todo, TodoStatus} from "../App.tsx";
import axios from "axios";


export default function AddNewTodo(){
    const [inputId, setInputId] = useState<string>("")
    function changeId(event:ChangeEvent<HTMLInputElement>){
        setInputId(event.target.value)
    }
    const [inputDescription, setInputDescription] = useState<string>("")
    function changeDescription(event:ChangeEvent<HTMLInputElement>){
        setInputDescription(event.target.value)
    }


    const inputStatus:TodoStatus="OPEN"
    function submitNewTodo(event:FormEvent<HTMLFormElement>){

        event.preventDefault()
        if(inputId && inputDescription){
            const newTodo = {
                id:inputId,
                description:inputDescription,
                status: inputStatus
            }
            axios.post("/api/todo",newTodo)
                //To know if a POST request was successful, you can rely on the response status code that the server sends back.
                //successful POST request typically returns a status code: 200
                .then((response)=>{
                    if(response.status===200) {
                    alert("Your new to-do item has been successfully created.\n"
                        +"id: "+inputId+"\n"
                        +"description: "+inputDescription+"\n"
                       )
                    } else {
                        alert("Post request failed! "+response.status)
                    }
                })
                .catch((error)=>alert(error.message))
    } else {
        alert("Please provide an id and a description for the new todo.")
        }
        setInputId("")
        setInputDescription("")
    }




    return(
        <>
            <h3>Add a New One</h3>
            <form onSubmit={submitNewTodo}>
                <div>
                <input
                type={"text"}
                placeholder={"id"}
                value={inputId}
                onChange={changeId}
                />
                </div>
                <div>
                <input
                    type={"text"}
                    placeholder={"description"}
                    value={inputDescription}
                    onChange={changeDescription}
                />
                </div>

                <button>Add</button>
            </form>
        </>
    )

}