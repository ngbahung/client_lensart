import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const FilterSection = ({ title, children, isOpen: defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-between w-full py-3 px-4 text-left hover:bg-gray-50"
      >
        <span className="font-medium">{title}</span>
        {isOpen ? (
          <AiOutlineMinus className="h-4 w-4" />
        ) : (
          <AiOutlinePlus className="h-4 w-4" />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

FilterSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
};

export default memo(FilterSection);