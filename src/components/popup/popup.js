import React from 'react';

import './popup.css';

const Popup = ({ message, handlePassive, handleActive, buttomCustom }) => {
  const activeButton = handleActive ? (
    <button className="btn btn-outline-secondary m-1" onClick={handleActive}>
      {buttomCustom}
    </button>
  ) : null;

  return (
    <div className="popup-wrap row m-0">
      <div className="col-md-6 mx-auto my-auto">
        <div className="card text-center popup">
          <div className="card-body">
            <h5 className="card-title">{message}</h5>
            {activeButton}
            <button className="btn btn-primary m-1" onClick={handlePassive}>
              {handleActive ? 'CANCEL' : 'OK'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
