import TodoCard from "./TodoCard.tsx";
import {Todo, TodoStatus} from "../App.tsx";
import NewTodoCard from "./NewTodoCard.tsx";
type TodoColumnProps={
    status:TodoStatus
    todos:Todo[]
    getDatas:()=>void
}
export default function TodoColumn(props:TodoColumnProps){

    return(
        <>
            <div>
                <h2>{props.status}</h2>
                {
                    props.todos.map((todo)=><TodoCard todo={todo} key={todo.id} getDatas={props.getDatas}/>)
                }
                {
                    (props.status==="OPEN") && <NewTodoCard getDatas={props.getDatas}/>
                }
            </div>

        </>
    )
}