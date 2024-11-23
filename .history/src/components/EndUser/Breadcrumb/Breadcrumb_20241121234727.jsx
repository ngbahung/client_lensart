import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Breadcrumb = ({ items }) => {
    const navigate = useNavigate();

    const paths = {
        "Trang chủ": "/",
        "Gọng kính": "/gong-kinh",
        // Add more path mappings as needed
    };

    const handleClick = (item) => {
        const path = paths[item];
        if (path) {
            navigate(path);
        }
    };

    return (
        <div className="flex items-center gap-1 py-4 text-gray-500">
            {items.map((item, index) => (
                // Use combination of item and index as key since items might repeat
                <React.Fragment key={`${item}-${index}`}>
                    <span 
                        onClick={() => handleClick(item)}
                        className={`cursor-pointer hover:text-black ${
                            index === items.length - 1 ? 'text-black' : ''
                        }`}
                    >
                        {item}
                    </span>
                    {index < items.length - 1 && (
                        <MdKeyboardArrowRight className="mt-1" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;