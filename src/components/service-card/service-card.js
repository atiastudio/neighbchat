import React from 'react';
import { connect } from 'react-redux';

import './service-card.css';

import { sendRequest } from '../../actions';
import { showPopup } from '../hoc';

const ServiceCard = ({ title, img, sendRequest }) => {
  const handleClick = (event) => {
    event.preventDefault();
    const message = `Do you want to request ${title}?`;
    showPopup(message, () => sendRequest(title), 'REQUEST');
  };

  return (
    <div className="col-md-6 p-0">
      <div className="card text-center">
        <div className="card-body bg-light">
          <div
            className="serv-item d-flex align-items-end justify-content-center"
            onClick={handleClick}
            style={{
              backgroundImage: `url(${img})`,
            }}
          >
            <h3 className="serv-item-title p-2 m-0">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sendRequest: (title) => dispatch(sendRequest(title)),
});

export default connect(null, mapDispatchToProps)(ServiceCard);
