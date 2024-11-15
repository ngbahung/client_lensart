import { NavLink } from "react-router-dom";

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
    return (
        <nav className="w-1/3">
            <div className="flex"</div>
            <NavLinks />
        </nav>
    );
}