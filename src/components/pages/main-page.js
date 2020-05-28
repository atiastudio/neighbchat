import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MsgContainer from '../msg-container';
import Servicies from '../servicies';
// import Realty from '../realty';
import RqstDisplay from '../rqst-display';
import UserDisplay from '../users-display';
import Menu from '../menu';

import { selectMsgLoadingInit } from '../../selectors';

class MainPage extends React.Component {
  state = {
    activeItem: 'Chat',
  };

  // Functions
  onItemClick = (name) => {
    this.setState({ activeItem: name });
  };

  // Render
  render() {
    const { activeItem } = this.state;
    const { msgLoadingInit } = this.props;

    const chat =
      activeItem === 'Chat' && !msgLoadingInit ? <MsgContainer /> : null;
    const services = activeItem === 'Services' ? <Servicies /> : null;
    const requests = activeItem === 'Requests' ? <RqstDisplay /> : null;
    const users = activeItem === 'Users' ? <UserDisplay /> : null;

    return (
      <div className="container app-cont">
        <div className="row">
          <Menu activeItem={activeItem} onItemClick={this.onItemClick}></Menu>
          {chat}
          {services}
          {requests}
          {users}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  msgLoadingInit: selectMsgLoadingInit,
});

export default connect(mapStateToProps)(MainPage);
