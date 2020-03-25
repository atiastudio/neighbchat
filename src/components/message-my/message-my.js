import React from 'react';

import { getNormDate } from '../../utils/getNormDate';

import './message-my.css';

const MessageMy = ({ message }) => {
  return (
    <div className="pagination justify-content-end">
      <div className="card d-inline-block m-1 my-message-my">
        <div className="card-body  p-1 text-right">
          <p className="card-text mb-1">{message.text}</p>
          <p className="card-text">
            <small className="text-muted">{getNormDate(message.time)}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageMy;
