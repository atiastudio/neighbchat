import React from 'react';

import './msg-input.css';

const MsgInput = ({ maxId, sendMsg }) => {
  let newMsg = {
    id: maxId,
    user: 'Ann',
    time: Date.now(),
    text: '',
    isMy: true
  };

  const handlePressEnter = event => {
    const msgTxt = event.target.innerText;

    if (
      event.key === 'Enter' &&
      event.shiftKey === false &&
      msgTxt.trim() !== ''
    ) {
      event.preventDefault();
      newMsg.text = msgTxt;
      sendMsg(newMsg);
      event.target.innerText = '';
    }
  };

  return (
    <form className="p-2 msg-form bg-light">
      <div className="form-group d-flex align-items-center">
        <div
          className="form-control msg-input"
          id="message"
          aria-placeholder="Напишите сообщение..."
          role="textbox"
          contentEditable="true"
          aria-multiline="true"
          onKeyPress={handlePressEnter}
        ></div>
        <div className="text-primary msg-send">
          <i className="fa fa-paper-plane p-2" aria-hidden="true"></i>
        </div>
      </div>
    </form>
  );
};

export default MsgInput;
