import React from 'react';

import Message from '../message';
import MessageMy from '../message-my';

import './msg-display.css';

const MsgDisplay = props => {
  return (
    <div className="msg-display bg-white">
      {props.messages.map(message => {
        if (message.isMy) {
          return <MessageMy key={message.id} message={message} />;
        } else {
          return <Message key={message.id} message={message} />;
        }
      })}
    </div>
  );
};

export default MsgDisplay;
