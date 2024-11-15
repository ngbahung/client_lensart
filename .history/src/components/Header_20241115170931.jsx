import { Link, useLocation } from "react-router-dom";
const Header = () => {
    const {pathName} = useLocation();

    return (
        <div className="md:lg:w-full w-9/12">
            <div className="flex justify-between md-lg:justify-center flex-wrap pl-8">
                <ul className="flex justify start items-start gap-8 text-sm font-bold md-lg:hidden">
                    <li>
                        <Link className={`p-2 block ${pathName === '/' ? 'text-blue-500' : 'text-gray-500'}`} to="/">Home</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
