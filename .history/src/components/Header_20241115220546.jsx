import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div>
                <Link to='/'>
                    <img src="http://localhost:5173/assets/images/logoBrand.png" alt="Logo" />
                </Link>
            </div>
        </div>
    );
}

export default Header;
