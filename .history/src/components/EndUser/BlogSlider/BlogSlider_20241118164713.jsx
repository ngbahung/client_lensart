import React from 'react';
import Slider from 'react-slick';
import BlogCard from '../BlogCard/BlogCard';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

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

const BlogSlider = ({ blogs = dummyBlogs }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: (
      <button className="slick-prev absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center">
        <MdChevronLeft className="text-2xl text-gray-600" />
      </button>
    ),
    nextArrow: (
      <button className="slick-next absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center">
        <MdChevronRight className="text-2xl text-gray-600" />
      </button>
    ),
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="relative px-12"> {/* Increased padding to accommodate arrows */}
      <Slider {...settings}>
        {blogs.map((blog) => (
          <div key={blog.id} className="px-2">
            <BlogCard blog={blog} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogSlider;