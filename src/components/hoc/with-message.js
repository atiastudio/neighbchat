import React from 'react';

import { showPopup } from '../hoc';

const withMessage = (Wrapped) =>
  class MessageWrap extends React.Component {
    // --------- REFS ---------
    targetRef = React.createRef();

    // --------- FUNCTIONS ---------
    handleDelete = () =>
      showPopup(
        'Are you sure delete the message?',
        () => this.props.deleteMessage(this.props.message._id),
        'DELETE'
      );

    // --------- LIFE CYCLE ---------
    componentDidMount() {
      const { unread, showDate } = this.props;
      if (unread) unread.observe(this.targetRef.current);
      if (showDate) showDate.observe(this.targetRef.current);
    }

    componentDidUpdate(prevProps) {
      const { unread, showDate } = this.props;

      if (!prevProps.unread) {
        if (unread) unread.observe(this.targetRef.current);
      }

      if (!prevProps.showDate) {
        if (showDate) showDate.observe(this.targetRef.current);
      }
    }

    componentWillUnmount() {
      const { unread, showDate } = this.props;
      if (unread) unread.unobserve(this.targetRef.current);
      if (showDate) showDate.unobserve(this.targetRef.current);
    }

    // --------- RENDER ---------
    render() {
      return (
        <Wrapped
          {...this.props}
          handleDelete={this.handleDelete}
          ref={this.targetRef}
        />
      );
    }
  };

export default withMessage;
