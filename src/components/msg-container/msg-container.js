import React from 'react';

import './msg-container.css';

import MsgDisplay from '../msg-display';
import MsgInput from '../msg-input';

class MsgContainer extends React.Component {
  // -------------- STATE --------------
  state = {
    bottom: 35,
  };

  // -------------- FUNCTIONS --------------
  handleMargin = (bottom) => {
    this.setState({ bottom });
  };

  // -------------- LIFE CYCLE --------------
  // componentDidMount() {

  // }

  render() {
    const { bottom } = this.state;
    // console.log(bottom);
    return (
      <div className="col-sm-9 d-flex flex-column justify-content-between msg-container">
        <MsgDisplay bottom={bottom} />
        <MsgInput handleMargin={this.handleMargin} />
        <div></div>
      </div>
    );
  }
}

export default MsgContainer;
