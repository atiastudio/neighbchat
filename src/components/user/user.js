import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faBan } from '@fortawesome/free-solid-svg-icons';

import './user.css';

import { updateClient } from '../../actions';

class User extends React.Component {
  // ----------- FUNCTIONS -----------
  handleClick = (event) => {
    const { updateClient, user } = this.props;
    const { isBan, _id } = user;

    const body = { isBan: !isBan };
    updateClient(body, _id);
  };

  // ----------- RENDER -----------
  render() {
    const { createdAt, name, email, photo, isBan } = this.props.user;

    const button = isBan ? (
      <button className="btn btn-light text-success" onClick={this.handleClick}>
        <FontAwesomeIcon icon={faBullhorn} size="3x" />
      </button>
    ) : (
      <button className="btn btn-light text-danger" onClick={this.handleClick}>
        <FontAwesomeIcon icon={faBan} size="3x" />
      </button>
    );

    return (
      <div className="card d-block m-1 bg-light">
        <div className="card-body  p-1">
          <div className="row">
            <div className="col-8 col-md-6 pl-md-4">
              <h6 className="card-title mb-1 text-primary">{name}</h6>
              <p className="card-text mb-1">{`Email: ${email}`}</p>
              <p className="card-text">
                <small className="text-muted">
                  {`Created at: ${moment(createdAt).format(
                    'MMMM Do YYYY, HH:mm'
                  )}`}
                </small>
              </p>
            </div>
            <div className="d-none d-md-block col-md-3">
              <img
                // src={`https://neibchat-api.herokuapp.com/img/users/${photo}`}
                src={`http://localhost:8000/img/users/${photo}`}
                alt="avatar"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-3 col-md-3 d-flex justify-content-center align-content-center">
              {button}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateClient: (body, _id) => dispatch(updateClient({ body, _id })),
});

export default connect(null, mapDispatchToProps)(User);
