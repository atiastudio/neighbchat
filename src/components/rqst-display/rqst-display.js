import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './rqst-display.css';

import Request from '../request';

import { selectRequests } from '../../selectors';

const RqstDisplay = ({ requests }) => {
  if (requests.length === 0) {
    return (
      <div className="col-sm-9 text-center pt-3">
        <span>
          You still don't have any requests. Please visit "services" tab
        </span>
      </div>
    );
  }
  return (
    <div className="col-sm-9 d-flex flex-column mb-5">
      <div className="rqst-display bg-white">
        {requests.map((request) => (
          <Request key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  requests: selectRequests,
});

export default connect(mapStateToProps)(RqstDisplay);
