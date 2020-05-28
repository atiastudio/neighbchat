import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { compose } from '../../utils';
import { withMessage } from '../hoc';
import { fetchMessagesSimple } from '../../actions';

import './message-my.css';

const MessageMy = React.forwardRef(
  ({ message, handleDelete, isError }, ref) => {
    // FOR BEING SENT MESSAGES
    const isDummy = message._id.startsWith('dummy_message_');
    const timeClass = isError ? 'text-danger' : 'text-muted';
    const time = isError
      ? "Message's not sent"
      : moment(message.createdAt).format('HH:mm');
    const timeIcon =
      isDummy && !isError ? (
        <div className="loading"></div>
      ) : (
        <p className="card-text">
          <small className={timeClass}>{time}</small>
        </p>
      );

    // FOR DELETED MESSAGES
    const isDeleted = message.isDeleted ? 'font-italic text-muted' : '';
    const deletedIcon =
      message.isDeleted || isDummy ? null : (
        <div className="icon-wrap">
          <p className="m-1 icon-delete" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </p>
        </div>
      );

    return (
      <div className="pagination justify-content-end">
        <div className="card d-inline-block m-1 my-message-my">
          <div className="card-body  p-1 text-right">
            {deletedIcon}
            <p className={`card-text mb-1 ${isDeleted}`}>{`${message.text}`}</p>
            {timeIcon}
            {/* <div className="loading"></div> */}
          </div>
        </div>
      </div>
    );
  }
);

const mapDispatchToProps = (dispatch) => ({
  deleteMessage: (id) =>
    dispatch(fetchMessagesSimple('deleteMessage', null, null, id)),
});

export default compose(
  connect(null, mapDispatchToProps),
  withMessage
)(MessageMy);
