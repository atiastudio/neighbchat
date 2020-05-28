import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { sendMessage } from '../../actions';
import { selectUserBan } from '../../selectors';

import './msg-input.css';

class MsgInput extends React.Component {
  refMessageBox = React.createRef();
  refInput = React.createRef();

  // ----------- STATE -----------
  state = {
    show: true,
    height: 35,
  };

  // ----------- FUNCTIONS -----------
  handleBlur = (event) => {
    const msgTxt = event.target.innerText;
    if (!msgTxt) {
      this.setState({ show: true });
    }
  };

  handleClick = (event) => {
    event.preventDefault();
    const msgTxt = this.refMessageBox.current.innerText.trim();

    const { isBan } = this.props;
    if (isBan) return;

    if (msgTxt !== '') {
      this.props.sendMessage(msgTxt);
      this.refMessageBox.current.innerText = '';
    }
  };

  handlePressEnter = (event) => {
    const msgTxt = event.target.innerText;

    const { isBan } = this.props;
    if (isBan) return;

    if (
      event.key === 'Enter' &&
      event.shiftKey === false &&
      msgTxt.trim() !== ''
    ) {
      event.preventDefault();
      this.props.sendMessage(msgTxt.trim());
      event.target.innerText = '';
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
    const margin = this.refInput.current.clientHeight;
    this.props.handleMargin(margin);
  };

  componentDidMount() {
    const margin = this.refInput.current.clientHeight;
    this.props.handleMargin(margin);
  }

  render() {
    const { show } = this.state;
    const plClass = show ? '' : 'd-none';
    return (
      <form className="p-2 msg-form bg-light" ref={this.refInput}>
        <div className="form-group d-flex align-items-center m-0">
          <div
            className="form-control msg-input"
            id="message"
            ref={this.refMessageBox}
            tabIndex="0"
            role="textbox"
            contentEditable="true"
            aria-multiline="true"
            onKeyPress={this.handlePressEnter}
            onBlur={this.handleBlur}
          ></div>
          <div className={`placeholder ${plClass}`}>Type a message...</div>
          <div className="text-primary msg-send p-2" onClick={this.handleClick}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isBan: selectUserBan,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (text) => dispatch(sendMessage(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MsgInput);
