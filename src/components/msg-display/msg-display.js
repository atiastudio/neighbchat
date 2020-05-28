import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import Message from '../message';
import MessageMy from '../message-my';
// import Spinner from '../spinner';
import MessageLoading from '../message-loading';
import MessageService from '../message-service';
import MessageDate from '../message-date';

import { setLastReadMsg, messagesRequested } from '../../actions';
import {
  selectUserId,
  selectMessages,
  selectLastReadMsg,
  selectMsgLoading,
  selectMsgPage,
  selectTheEnd,
} from '../../selectors';

import './msg-display.css';

class MsgDisplay extends React.Component {
  root = React.createRef();
  refUnread = React.createRef();
  refBottom = React.createRef();

  // ------------- STATE -------------
  state = {
    currentDate: '',
  };

  // ------------- FUNCTIONS -------------
  scrollToBottom = () => {
    this.refBottom.current.scrollIntoView({
      block: 'start',
    });
  };

  scrollToUnread = () => {
    if (this.refUnread.current)
      this.refUnread.current.scrollIntoView({
        block: 'center',
      });
  };

  handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.props.setLastReadMsg(entry.target.dataset.createdat);
        observer.unobserve(entry.target);
      }
    });
  };

  handleInfinite = (event) => {
    const { loading, theEnd } = this.props;

    if (!loading && !theEnd) {
      const el = this.root.current;

      if (el.scrollTop < 200) {
        console.log('MSGDISPLAY: I am fetcheng!');
        this.props.fetchMessages();
      }
    }
  };

  handleShowDate = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentDate = entry.target.dataset.createdat;
        this.setState({ currentDate });
      }
    });
  };

  handleShowDateHover = (event) => {
    const currentDate = moment(this.state.currentDate)
      .add(1, 's')
      .toISOString();
    this.setState({ currentDate });
  };

  intObserver = new IntersectionObserver(this.handleIntersect, {
    root: this.root.current,
    rootMargin: '0px',
    threshold: 1,
  });

  // ------------- LIFE CYCLE -------------
  componentDidMount() {
    const observerHeight = this.root.current.clientHeight;
    this.intObserverDsplDate = new IntersectionObserver(this.handleShowDate, {
      root: this.root.current,
      rootMargin: `-${observerHeight * 0.02}px 0px -${
        observerHeight * 0.9
      }px 0px`,
      threshold: [0, 0.01],
    });

    if (this.refUnread.current) {
      this.scrollToUnread();
    } else {
      this.scrollToBottom();
    }

    this.setState({ updateDate: 'Hello!' });
  }

  componentDidUpdate(prevProps) {
    // console.log('Component Did Updated!!!');
    if (this.props.messages !== prevProps.messages) {
      const el = this.root.current;
      if (el.scrollTop + el.clientHeight + 200 > el.scrollHeight)
        this.scrollToBottom();
    }
  }

  // ------------- RENDER -------------
  render() {
    const { messages, userId, userLastReadMsg, bottom } = this.props;
    const messagesNew = [...messages];

    return (
      <div
        className="msg-display bg-white"
        style={{ bottom }}
        ref={this.root}
        onScroll={this.handleInfinite}
        onMouseEnter={this.handleShowDateHover}
      >
        <MessageDate currentDate={this.state.currentDate} ref={this.refTop} />
        <MessageLoading />
        {messagesNew.map((message) => {
          if (message._id.startsWith('service_')) {
            return (
              <MessageService
                key={message._id}
                message={message}
                ref={this.refUnread}
              />
            );
          }

          let isNotRead = false,
            unread;

          if (message.createdAt > userLastReadMsg) {
            isNotRead = true;
            unread = this.intObserver;
          }

          if (userId === message.user._id) {
            return (
              <MessageMy
                key={message._id}
                message={message}
                isError={message.isError}
              />
            );
          } else {
            return (
              <Message
                key={message._id}
                message={message}
                isNotRead={isNotRead}
                unread={unread}
                showDate={this.intObserverDsplDate}
              />
            );
          }
        })}
        <div ref={this.refBottom}></div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
  userLastReadMsg: selectLastReadMsg,
  messages: selectMessages,
  loading: selectMsgLoading,
  pageMsg: selectMsgPage,
  theEnd: selectTheEnd,
});

// const mapDispatchToProps = (dispatch, { chapiService }) =>
//   bindActionCreators(
//     {
//       setLastReadMsg: setLastReadMsg(chapiService),
//       fetchMessages: messagesRequested,
//     },
//     dispatch
//   );

const mapDispatchToProps = (dispatch) => ({
  setLastReadMsg: (createdAt) => dispatch(setLastReadMsg(createdAt)),
  fetchMessages: () => dispatch(messagesRequested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MsgDisplay);
