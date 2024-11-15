import { Link } from "react-router-dom";
import { BiListUl } from "react-icons/bi";

const Header = () => {

    return (
        <div className='w-white'>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
                
                    <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
                        <div className='flex justify-between items-center'>

                            <Link to='/'>
                                <img src="" alt="Logo" />
                            </Link>
                            <div className='justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden'>
                            <span> <BiListUl /> </span>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
