// Input.js
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, label, name, placeholder, value, onChange, width, height }) => {
  return (
    <div className="mb-2">
      <label className="text-sm">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        style={{ width: width ? width : '100%', height: height? height: '100%' }}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  name: PropTypes.string
};

export default Input;
