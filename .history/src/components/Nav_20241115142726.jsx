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
        <>
            <nav className="flex w-1/3 justify-end">
                <div className="hidden w-full justify-between md:flex">
                    <NavLinks />
                </div>  
                <div className="md:hidden">
                    <button onClick={toogleNavBar}>{isOpen ? <X /> </button>
                </div>       
             </nav>
             {isOpen && (
                <div className="flex flex-col">
                    <NavLinks />
                </div>
                )}
        </>
    );
};

export default Nav;