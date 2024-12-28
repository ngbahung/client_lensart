import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <h1 className="text-4xl font-bold mb-8">Về Chúng Tôi</h1>
          
          <div className="space-y-8">
            <section>
              <p className="text-gray-700">
                Ra đời năm 2024, LensArt Eyewear nhanh chóng trở thành một hiện tượng trong làng thời trang mắt kính Việt Nam. Với thiết kế trẻ trung, năng động và chất lượng vượt trội, thương hiệu này đã chinh phục trái tim của hàng triệu bạn trẻ.
              </p>
              <p className="text-gray-700 mt-4">
                Gần một thập kỷ đồng hành cùng thị trường, LensArt không ngừng phát triển và mở rộng. Mạng lưới cửa hàng trải dài khắp cả nước, từ những thành phố lớn đến các tỉnh thành nhỏ lẻ, mang đến cho khách hàng cơ
              </p>
            </section>
          </div>
        </div>
        <div className="md:col-span-5">
          <img
            src="https://i.redd.it/9c3ptmtdvbwc1.jpeg"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
