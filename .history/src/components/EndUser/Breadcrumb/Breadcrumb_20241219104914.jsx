import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

/**
 * @description Component hiển thị thanh điều hướng (breadcrumb) cho phép người dùng
 * theo dõi vị trí hiện tại của họ trong hệ thống phân cấp của trang web
 * 
 * @param {Array<Object>} items - Mảng các đối tượng thể hiện các mục điều hướng
 */
const Breadcrumb = ({ items }) => {
    const navigate = useNavigate();

    /**
     * Xử lý sự kiện click vào một mục điều hướng
     * @param {string} path - Đường dẫn của mục điều hướng được click
     */
    const handleClick = (path) => {
        if (path) {
            navigate(path);
        }
    };

    // Convert string items to objects if needed
    const normalizedItems = items.map(item => 
        typeof item === 'string' 
            ? { label: item, path: null }
            : item
    );

    // Render component breadcrumb với các mục điều hướng và biểu tượng mũi tên
    return (
        <div className="flex items-center gap-1 py-4 text-gray-500">
            {normalizedItems.map((item, index) => (
                // Use combination of item.label and index as key since items might repeat
                <React.Fragment key={`${item.label}-${index}`}>
                    <span 
                        onClick={() => handleClick(item.path)}
                        className={`cursor-pointer hover:text-black ${
                            index === normalizedItems.length - 1 ? 'text-black' : ''
                        } ${item.path ? 'hover:underline' : ''}`}
                    >
                        {item.label}
                    </span>
                    {index < normalizedItems.length - 1 && (
                        <MdKeyboardArrowRight className="mt-1" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Breadcrumb;