import {ChangeEvent, FormEvent, useState} from "react";
import {Todo, TodoStatus} from "../App.tsx";
type AddNewTodoProps={
    addNewTodoInData:(newTodo:Todo)=>void
}

export default function AddNewTodo(props:AddNewTodoProps) {
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
        if(inputId && inputStatus){
            const newTodo = {
                id:inputId,
                description:inputDescription,
                status: inputStatus
            }
            props.addNewTodoInData(newTodo)
            alert("Successful!")
        } else {
            alert("please give a name and a description to your new todo.")
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