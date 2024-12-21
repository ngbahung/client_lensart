import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTruck, FaExchangeAlt } from 'react-icons/fa';

const ShippingReturnPolicy = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-50 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors"
            >
                <h3 className="text-lg font-semibold">Chính sách vận chuyển & đổi trả</h3>
                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {isExpanded && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-teal-600">
                            <FaTruck size={20} />
                            <h4 className="font-medium">Vận chuyển</h4>
                        </div>
                        <ul className="list-disc pl-7 text-gray-600 text-sm space-y-2">
                            <li>Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ</li>
                            <li>Thời gian giao hàng: 2-3 ngày làm việc</li>
                            <li>Đóng gói cẩn thận, bảo đảm an toàn</li>
                        </ul>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-teal-600">
                            <FaExchangeAlt size={20} />
                            <h4 className="font-medium">Chính sách đổi trả</h4>
                        </div>
                        <ul className="list-disc pl-7 text-gray-600 text-sm space-y-2">
                            <li>Đổi trả miễn phí trong vòng 30 ngày</li>
                            <li>Sản phẩm chưa qua sử dụng và còn nguyên tem mác</li>
                            <li>Hoàn tiền trong vòng 7 ngày làm việc</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingReturnPolicy;