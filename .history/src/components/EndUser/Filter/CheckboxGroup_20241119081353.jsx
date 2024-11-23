const CheckboxGroup = ({ options }) => {
    return (
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">{option}</span>
          </label>
        ))}
      </div>
    );
  };

ex