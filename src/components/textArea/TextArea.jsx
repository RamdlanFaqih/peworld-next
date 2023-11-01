// TextArea.js
import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="mb-2">
      <label className="font-semibold text-sm">{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 resize-none w-full"
        rows="4" // Atur jumlah baris textarea sesuai kebutuhan
      />
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextArea;
