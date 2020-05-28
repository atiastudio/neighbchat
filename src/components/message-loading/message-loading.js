import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectMsgLoading, selectMsgError } from '../../selectors';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './message-loading.css';

const MessageLoading = ({ loading, error }) => {
  const isLoading = loading ? <Spinner /> : null;
  const isError = error ? <ErrorIndicator /> : null;

  return (
    <div className="pagination justify-content-center">
      {isError}
      {isLoading}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectMsgLoading,
  error: selectMsgError,
});

export default connect(mapStateToProps)(MessageLoading);
