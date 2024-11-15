import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";

const NavLinks = () => {
    return (
        <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </>
    );
}

const Nav = () => {

    const 
    return (
        <nav className="w-1/3">
            <div className="flex justify-between">
                <NavLinks />
            </div>  
            <div>
                <button></button>
            </div>       
        </nav>
    );
}