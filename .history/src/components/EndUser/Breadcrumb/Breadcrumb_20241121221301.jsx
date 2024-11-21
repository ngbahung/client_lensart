
import { MdKeyboardArrowRight } from "react-icons/md";

const Breadcrumb = ({ items }) => {
    return (
        <div className="flex items-center gap-1 py-4 text-gray-500">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <span className={`cursor-pointer hover:text-black ${index === items.length - 1 ? 'text-black' : ''}`}>
                        {item}
                    </span>
                    {index < items.length - 1 && <MdKeyboardArrowRight className="mt-1" />}
                </div>
            ))}
        </div>
    );
};

export default Breadcrumb;