
import React from 'react';

const ShippingReturnPolicy = () => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Chính sách vận chuyển & đổi trả</h3>
            
            <div className="space-y-4">
                <div>
                    <h4 className="font-medium mb-2">Vận chuyển</h4>
                    <ul className="list-disc pl-5 text-gray-600">
                        <li>Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ</li>
                        <li>Thời gian giao hàng: 2-3 ngày làm việc</li>
                        <li>Đóng gói cẩn thận, bảo đảm an toàn</li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-medium mb-2">Chính sách đổi trả</h4>
                    <ul className="list-disc pl-5 text-gray-600">
                        <li>Đổi trả miễn phí trong vòng 30 ngày</li>
                        <li>Sản phẩm chưa qua sử dụng và còn nguyên tem mác</li>
                        <li>Hoàn tiền trong vòng 7 ngày làm việc</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ShippingReturnPolicy;