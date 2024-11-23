import React, { memo } from 'react';
import PropTypes from 'prop-types';

const CheckboxGroup = ({ options, selectedValues, onChange }) => (
  <div className="space-y-2">
    {options.map((option) => (
      <label key={option} className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={selectedValues.includes(option)}
          onChange={() => onChange(option)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600">{option}</span>
      </label>
    ))}
  </div>
);

CheckboxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(CheckboxGroup);