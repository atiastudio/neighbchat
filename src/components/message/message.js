import React from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from '../../utils';

import { withMessage } from '../hoc';
import { selectUserRole } from '../../selectors';
import { fetchMessagesSimple } from '../../actions';

import './message.css';

const Message = React.forwardRef(
  ({ message, isNotRead, role, handleDelete }, ref) => {
    const isDeleted = message.isDeleted ? 'font-italic text-muted' : '';
    const isNotReadBg = isNotRead ? 'message-unread' : '';
    // For deleting messages by admin
    const deletedIcon =
      !message.isDeleted && role === 'admin' ? (
        <div className="icon-wrap-r">
          <p className="m-1 icon-delete" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </p>
        </div>
      ) : null;

    return (
      <div className={`pagination ${isNotReadBg}`}>
        <div
          className="card d-inline-block m-1 bg-light"
          data-createdat={message.createdAt}
          ref={ref}
        >
          <div className="card-body  p-1">
            {deletedIcon}
            <h6 className="card-title mb-1 text-primary">
              {message.user.name}
            </h6>
            <p className={`card-text mb-1 ${isDeleted}`}>{message.text}</p>
            <p className="card-text">
              <small className="text-muted">
                {moment(message.createdAt).format('HH:mm')}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

const mapStateToProps = createStructuredSelector({
  role: selectUserRole,
});

const mapDispatchToProps = (dispatch) => ({
  deleteMessage: (id) =>
    dispatch(fetchMessagesSimple('deleteMessage', null, null, id)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withMessage
)(Message);
