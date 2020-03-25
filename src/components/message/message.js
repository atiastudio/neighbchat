import React from 'react';

import { getNormDate } from '../../utils/getNormDate';

import './message.css';

const Message = ({ message }) => (
  <div className="pagination">
    <div className="card d-inline-block m-1 bg-light">
      <div className="card-body  p-1">
        <h6 className="card-title mb-1 text-primary">{message.user}</h6>
        <p className="card-text mb-1">{message.text}</p>
        <p className="card-text">
          <small className="text-muted">{getNormDate(message.time)}</small>
        </p>
      </div>
    </div>
  </div>
);

export default Message;
