import React from 'react';

import { getNormDate } from '../../utils';

import './message-date.css';

class MessageDate extends React.Component {
  state = { show: false };

  componentDidUpdate(prevProps) {
    if (this.props.currentDate !== prevProps.currentDate) {
      clearTimeout(this.timerId);
      this.setState({ show: true });
      this.timerId = setTimeout(() => {
        this.setState({ show: false });
      }, 3000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  render() {
    const show = this.state.show ? '' : 'hide';

    return (
      <div className="message-date__wrap d-flex justify-content-center align-items-start">
        <div className={`message-date ${show} card text-muted px-1 shadow-sm`}>
          <span>{getNormDate(this.props.currentDate)}</span>
        </div>
      </div>
    );
  }
}

export default MessageDate;
