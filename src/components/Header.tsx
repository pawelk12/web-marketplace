import {NavLink} from "react-router-dom";

export const Header = () =>{
    return (
        <div>
            <NavLink to={"/listings"}>Home</NavLink>    |    <NavLink to={"/listings/new"}>Create Listing</NavLink>
        </div>
    )
}