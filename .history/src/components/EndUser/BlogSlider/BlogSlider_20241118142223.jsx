
import React from 'react';
import Slider from 'react-slick';
import BlogCard from '../BlogCard/BlogCard';

const BlogSlider = ({ blogs }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <Slider {...settings}>
      {blogs.map((blog) => (
        <div key={blog.id} className="px-2">
          <BlogCard />
        </div>
      ))}
    </Slider>
  );
};

export default BlogSlider;