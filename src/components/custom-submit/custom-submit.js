import React from 'react';

import './custom-submit.css';

const CustomSubmit = ({ children, handleChange, ...otherProps }) => (
  <button className="btn btn-primary btn-block" {...otherProps}>
    {children}
  </button>
);

export default CustomSubmit;
