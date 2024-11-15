import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div className="w-1/3">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
        </div>
    );
}

export default Nav;