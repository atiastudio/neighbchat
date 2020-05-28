import React from 'react';

import './custom-input.css';

const CustomInput = ({ handleChange, label, body = {}, ...otherProps }) => {
  const { name, type } = otherProps;
  const value = body[name] || '';
  const typeAuto = name.includes('password') ? 'password' : name;
  const typeCustom = type || typeAuto;

  return (
    <div className="form-group mb-0">
      <input
        className="form-control"
        onChange={handleChange}
        value={value}
        type={typeCustom}
        // placeholder={label || ''}
        {...otherProps}
      />
      {label ? (
        <label
          className={`${value ? 'lift' : ''} input-form_label`}
          // for={`${otherProps.name}`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default CustomInput;
