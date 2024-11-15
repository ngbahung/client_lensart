import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div className="">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </div>
    );
}

export default Nav;