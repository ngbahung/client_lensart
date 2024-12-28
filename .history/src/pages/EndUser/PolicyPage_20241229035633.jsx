import React from 'react';

const PolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Chính Sách Bảo Hành</h1>
          <img
            src="/src/assets/images/lensart_policy.png"
            alt="Banner Chính Sách Bảo Hành"
            className="w-full h-48 object-cover rounded-lg mt-6 shadow-lg"
          />
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Thời Gian và Phạm Vi Bảo Hành</h2>
            <p className="text-gray-600 leading-relaxed">
              - Gọng kính: Bảo hành 12 tháng về các lỗi về hàn gẫy, tróc sơn, bong xi<br/>
              - Tròng kính: Bảo hành 12 tháng về các lỗi kỹ thuật như bong tróc, nứt vỡ do lỗi sản xuất<br/>
              - Các phụ kiện đi kèm: Bảo hành 1 tháng
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Điều Kiện Bảo Hành</h2>
            <p className="text-gray-600 leading-relaxed">
              - Sản phẩm còn trong thời hạn bảo hành<br/>
              - Còn giữ phiếu bảo hành và hóa đơn mua hàng<br/>
              - Sản phẩm bị lỗi do nhà sản xuất<br/>
              - Sản phẩm không bị biến dạng do tác động bên ngoài
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Không Bảo Hành Trong Các Trường Hợp</h2>
            <p className="text-gray-600 leading-relaxed">
              - Sản phẩm bị rơi, va đập, cong vênh<br/>
              - Sản phẩm bị trầy xước do sử dụng<br/>
              - Sản phẩm đã bị sửa chữa bởi nơi khác<br/>
              - Hết thời hạn bảo hành hoặc không có phiếu bảo hành
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
