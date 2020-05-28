import React from 'react';
import ReactDOM from 'react-dom';

import Popup from '../popup';

const showPopup = (message, handleCustom, buttomCustom) => {
  class ShowPopup extends React.Component {
    // --------------- STATE ---------------
    state = {
      show: true,
    };

    // --------------- FUNCTIONS ---------------
    handlePassive = (event) => {
      event.preventDefault();

      this.setState({
        show: false,
      });
    };

    handleActive = (event) => {
      event.preventDefault();

      handleCustom();

      this.setState({
        show: false,
      });
    };

    // --------------- RENDER ---------------
    render() {
      if (!this.state.show) return null;
      return (
        <Popup
          message={message}
          handlePassive={this.handlePassive}
          handleActive={handleCustom ? this.handleActive : null}
          buttomCustom={buttomCustom}
        />
      );
    }
  }

  ReactDOM.render(<ShowPopup />, document.getElementById('modal'));
};

export default showPopup;
