import React from 'react';

import './message-service.css';

const MessageService = React.forwardRef(({ message: { text, _id } }, ref) => {
  const myRef = _id === 'service_unreadmark' ? ref : null;

  return (
    <div className="pagination justify-content-center text-muted" ref={myRef}>
      <span>{text}</span>
    </div>
  );
});

export default MessageService;
