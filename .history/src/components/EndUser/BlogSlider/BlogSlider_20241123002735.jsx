// Import các thư viện và components cần thiết
import React from 'react';
import Slider from 'react-slick';
import BlogCard from '../BlogCard/BlogCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Dữ liệu mẫu cho các bài viết blog
const dummyBlogs = [
  {
    id: 1,
    title: "Gọng kính hình bướm - Phong cách gọng kính độc đáo!",
    postedDate: "26/10/2024",
    image: "https://picsum.photos/400/300?random=1"
  },
  {
    id: 2,
    title: "Xu hướng gọng kính 2024 - Những mẫu được ưa chuộng",
    postedDate: "25/10/2024",
    image: "https://picsum.photos/400/300?random=2"
  },
  {
    id: 3,
    title: "Cách chọn gọng kính phù hợp với khuôn mặt",
    postedDate: "24/10/2024",
    image: "https://picsum.photos/400/300?random=3"
  }
];

// Component tùy chỉnh cho nút điều hướng (prev/next)
// direction: hướng của nút (left/right)
// onClick: hàm xử lý sự kiện khi click
const CustomArrow = ({ direction, onClick }) => {
  // Tạo className cho nút điều hướng với vị trí và style tương ứng
  const arrowClass = `absolute ${direction === 'left' ? '-left-2 sm:-left-6' : '-right-2 sm:-right-6'} top-1/2 -translate-y-1/2 
      bg-white rounded-full p-1.5 sm:p-2.5 shadow-md cursor-pointer z-10 hover:bg-gray-100 transition-colors`;
  
  return (
      <div className={arrowClass} onClick={onClick}>
          {direction === 'left' ? 
              <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : 
              <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          }
      </div>
  );
};

// Component BlogSlider chính
// blogs: mảng chứa thông tin các bài viết (mặc định sử dụng dummyBlogs)
const BlogSlider = ({ blogs = dummyBlogs }) => {
  // Cấu hình cho slider
  const settings = {
    dots: true, // Hiển thị chấm điều hướng
    infinite: true, // Cho phép lặp vô tận
    speed: 500, // Tốc độ chuyển slide
    slidesToShow: 3, // Số slide hiển thị cùng lúc
    slidesToScroll: 1, // Số slide được chuyển khi điều hướng
    prevArrow: <CustomArrow direction="left" />, // Nút previous tùy chỉnh
    nextArrow: <CustomArrow direction="right" />, // Nút next tùy chỉnh
    autoplay: true, // Tự động chuyển slide
    autoplaySpeed: 3000, // Thời gian giữa các lần chuyển slide (ms)
    // Cấu hình responsive cho màn hình khác nhau
    responsive: [
      {
        breakpoint: 1024, // Màn hình tablet
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640, // Màn hình mobile
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="blog-slider relative px-4 sm:px-12">
      <Slider {...settings}>
        {blogs.map((blog) => (
          <div key={blog.id} className="px-2 mb-4 sm:mb-0">
            <BlogCard blog={blog} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogSlider;