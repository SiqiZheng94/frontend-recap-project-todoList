import {Link} from "react-router-dom";

export default function Navigation (){
    return(
        <>
            <Link to={"/"}>Home</Link>
            <span> </span>
            <Link to={"/tododetails"}>Details</Link>
            <span> </span>
            <Link to={"/addnewtodo"}>Add</Link>
        </>
    )
}