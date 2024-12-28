import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <h1 className="text-4xl font-bold mb-6">Về Chúng Tôi</h1>
          <p className="text-gray-700 mb-4">
            Chào mừng đến với nền tảng của chúng tôi! Chúng tôi cam kết cung cấp dịch vụ 
            xuất sắc và các giải pháp sáng tạo để đáp ứng nhu cầu của bạn. Đội ngũ 
            chuyên gia của chúng tôi làm việc không mệt mỏi để đảm bảo tiêu chuẩn 
            chất lượng cao nhất trong mọi việc chúng tôi làm.
          </p>
          <p className="text-gray-700 mb-4">
            Được thành lập với tầm nhìn cách mạng hóa ngành công nghiệp, chúng tôi 
            đã phát triển để trở thành đối tác đáng tin cậy của vô số khách hàng. 
            Cam kết về sự xuất sắc và sự hài lòng của khách hàng thúc đẩy chúng tôi 
            không ngừng cải tiến và phát triển.
          </p>
          <p className="text-gray-700">
            Hãy đồng hành cùng chúng tôi trên hành trình tiếp tục phát triển và 
            đổi mới, luôn đặt khách hàng lên hàng đầu.
          </p>
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
