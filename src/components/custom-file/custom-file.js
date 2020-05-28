import React from 'react';

import './custom-file.css';

const CustomFile = ({ handleChange, name, body = {}, ...otherProps }) => {
  const title = body.file ? body.file : 'Choose file';
  const value = body[name] || '';
  return (
    <div className="custom-file mb-3">
      <input
        className="custom-file-input"
        type="file"
        accept="image/*"
        id="myfile"
        onChange={handleChange}
        {...otherProps}
      />
      <label className="custom-file-label" htmlFor="myfile">
        {title}
      </label>
    </div>
  );
};

export default CustomFile;
