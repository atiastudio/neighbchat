import React from 'react';

import './content.css';

const Content = props => (
  <div className="col-9 d-flex flex-column justify-content-between my-content">
    {props.children}
  </div>
);

export default Content;
