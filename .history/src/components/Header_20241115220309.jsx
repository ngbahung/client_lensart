import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div>
            <div>
                <Link to='/'>
                    <img src="http://localhost/images/logo.png" alt="" />
                </Link>
            </div>
        </div>
    )
}

export default Header
