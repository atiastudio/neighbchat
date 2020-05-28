import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

import './request.css';

import { updateRequest } from '../../actions';

class Request extends React.Component {
  // ------------- FUNCTIONS -------------
  handleClick = (event) => {
    const { updateRequest, request } = this.props;
    const { isCompleted, _id } = request;

    const body = { isCompleted: !isCompleted };
    updateRequest(body, _id);
  };

  // ------------- RENDER -------------
  render() {
    const {
      request: { user, request, createdAt, isCompleted },
    } = this.props;

    const button = isCompleted ? (
      <button
        className="btn btn-secondary text-light"
        onClick={this.handleClick}
      >
        <FontAwesomeIcon icon={faTimes} size="3x" />
      </button>
    ) : (
      <button className="btn btn-light text-success" onClick={this.handleClick}>
        <FontAwesomeIcon icon={faCheck} size="3x" />
      </button>
    );

    return (
      <div
        className={`card d-block m-1 ${
          isCompleted ? 'bg-secondary' : 'bg-light'
        }`}
      >
        <div className="card-body  p-1">
          <div className="row">
            <div className="col-8 col-md-8 pl-md-4">
              <h6
                className={`card-title mb-1 ${
                  isCompleted ? 'text-light' : 'text-primary'
                }`}
              >
                {user.name}
              </h6>
              <p
                className={`card-text mb-1 ${isCompleted ? 'text-light' : ''}`}
              >
                {request}
              </p>
              <p className="card-text">
                <small className={isCompleted ? 'text-light' : 'text-muted'}>
                  {moment(createdAt).format('MMMM Do YYYY, HH:mm')}
                </small>
              </p>
            </div>
            <div className="col-3 col-md-4 d-flex justify-content-center align-content-center">
              {button}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateRequest: (body, _id) => dispatch(updateRequest({ body, _id })),
});

export default connect(null, mapDispatchToProps)(Request);
