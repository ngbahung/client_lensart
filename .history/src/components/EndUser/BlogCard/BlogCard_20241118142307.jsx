import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineArrowRight, HiOutlineGlasses } from 'react-icons/hi';

const FaceSection = ({ title }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="text-gray-600 text-sm">{title}</div>
    <div className="flex gap-2">
      <div className="w-12 h-12 border rounded-full"></div>
      <div className="w-12 h-12 border rounded-full"></div>
    </div>
  </div>
);

FaceSection.propTypes = {
  title: PropTypes.string.isRequired,
};

const BlogCard = ({ title, date, onCardClick, onReadMoreClick }) => {
  const handleReadMoreClick = (e) => {
    e.stopPropagation();
    onReadMoreClick?.();
  };

  return (
    <div 
      className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={onCardClick}
    >
      <div className="flex p-4 gap-4">
        <div className="w-1/2 bg-amber-300 rounded-lg p-4 flex flex-col justify-center items-center">
          <HiOutlineGlasses className="text-4xl mb-2" />
          <div className="text-lg font-medium text-center">GỌNG CÁNH BƯỚM</div>
        </div>

        <div className="w-1/2 flex flex-col justify-center gap-4">
          <FaceSection title="MẶT TRÁI XOAN" />
          <FaceSection title="MẶT TRÒN" />
        </div>
      </div>

      <div className="px-4 pb-4">
        <h3 className="font-medium text-lg mb-2">{title}</h3>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>Blog</span>
            <span>|</span>
            <span>Ngày {date}</span>
          </div>
          <button 
            className="flex items-center gap-1 text-blue-400 hover:text-blue-600 transition-colors duration-200"
            onClick={handleReadMoreClick}
          >
            ĐỌC TIẾP
            <HiOutlineArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onCardClick: PropTypes.func,
  onReadMoreClick: PropTypes.func,
};

BlogCard.defaultProps = {
  title: 'Gọng kính hình bướm - Phong cách gọng kính độc đáo!',
  date: '26/10/2024',
  onCardClick: () => console.log('Card clicked'),
  onReadMoreClick: () => console.log('Read more clicked'),
};

export default memo(BlogCard);