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

    const [isOpen, setIsOpen] = useState(false);

    const toogleNavBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="w-1/3">
            <div className="hidden">
                <NavLinks />
            </div>  
            <div className="md:hidden">
                <button onClick={toogleNavBar}></button>
            </div>       
        </nav>
    );
}