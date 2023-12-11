import {Todo} from "../App.tsx";

type TodoDetailsProps={
    todoList:Todo[]|null
}
export default function TodoDetails(props:TodoDetailsProps){
    return(
        <>
            <h2>Data List</h2>
            {props.todoList?.map(todo=>
                <div>
                    <p>id : {todo.id}</p>
                    <p>description : {todo.description}</p>
                    <p>status : {todo.status}</p>
                </div>
            )}
        </>
    )
}