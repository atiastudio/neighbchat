import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './error-line.css';

import { selectUserBan, selectConnection } from '../../selectors';

const ErrorLine = ({ isBan, isConnect }) => {
  const connection = isConnect ? null : 'Please, check the internet connection';
  const ban = isBan && isConnect ? "You've been banned" : null;
  const display = !isBan && isConnect ? 'd-none' : 'd-flex';

  return (
    <div className={`${display} justify-content-center mb-1 error-line`}>
      <span className="text-warning text-center">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        &nbsp;{connection}
        {ban}&nbsp;
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isBan: selectUserBan,
  isConnect: selectConnection,
});

export default connect(mapStateToProps)(ErrorLine);
