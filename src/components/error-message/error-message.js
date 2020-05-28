import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './error-message.css';

import { selectErrMsg } from '../../selectors';

class ErrorMessage extends React.Component {
  // --------- State ---------
  state = {
    errMsg: '',
  };

  // --------- LIFE CYCLE ---------
  componentDidUpdate(prevProps) {
    const { errMsg } = this.props;
    const errMsgPrev = prevProps.errMsg;

    if (errMsg !== errMsgPrev) {
      this.setState({ errMsg });
    }
  }

  // --------- RENDER ---------
  render() {
    const { errMsg } = this.state;

    return (
      <div className={`invalid-feedback ${errMsg ? 'd-block' : ''} mb-4 mt-0`}>
        <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
        {errMsg}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  errMsg: selectErrMsg,
});

export default connect(mapStateToProps)(ErrorMessage);
