import React from 'react';
import Slider from 'react-slick';
import BlogCard from '../BlogCard/BlogCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomArrow = ({ direction, onClick }) => {
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

const BlogSlider = ({ blogs = [] }) => {
  const settings = {
    dots: true,
    infinite: blogs.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
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
          arrows: false,
          dots: true
        }
      }
    ]
  };

  if (!blogs.length) return null;

  return (
    <div className="blog-slider relative px-4 sm:px-12 pb-8">
      <Slider {...settings}>
        {blogs.map((blog) => (
          <div key={blog.id} className="px-2 mb-8 sm:mb-12">
            <BlogCard blog={blog} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogSlider;