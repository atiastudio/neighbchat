import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './users-display.css';

import User from '../user';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';

import { selectClients } from '../../selectors';

class UsersDisplay extends React.Component {
  // ------------------- STATE -------------------
  state = {
    filtValue: '',
    filtStatus: 'all',
  };
  // ------------------- FUNCTIONS -------------------
  showFiltred = (items, filtStatus, filtValue) => {
    let arrNew = items.filter((el) =>
      el.name.toLowerCase().includes(filtValue.toLowerCase())
    );
    arrNew = arrNew.filter((el) => el.role === 'user');
    switch (filtStatus) {
      case 'ban':
        return arrNew.filter((el) => el.isBan);
      default:
        return arrNew;
    }
  };

  onFiltred = (filtValue) => {
    // console.log('Value filtered: ', fValue);
    this.setState({
      filtValue,
    });
  };

  onStatusFiltred = (filtStatus) => {
    // console.log('Status filtered: ', fStatus);
    this.setState({
      filtStatus,
    });
  };

  // ------------------- FUNCTIONS -------------------
  render() {
    const { filtValue, filtStatus } = this.state;
    const { users } = this.props;
    const usersVisible = this.showFiltred(users, filtStatus, filtValue);
    return (
      <div className="col-sm-9 d-flex flex-column mb-5">
        <div className="card my-1">
          <div className="card-body row py-2 py-md-3">
            <div className="col-md-7 col-lg-8 p-0 mb-2 mb-md-0">
              <SearchPanel onFiltred={this.onFiltred} />
            </div>
            <div className="col-md-5 col-lg-4 p-0 d-flex justify-content-center">
              <ItemStatusFilter
                filtStatus={filtStatus}
                onStatusFiltred={this.onStatusFiltred}
              />
            </div>
          </div>
        </div>
        <div className="rqst-display bg-white">
          {usersVisible.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  users: selectClients,
});

// const mapDispatchToProps = (dispatch) => ({
//   fetchUser: () => dispatch(userRequested({ reqParams })),
//   listenMsgNew: () => dispatch(listenMsgNew()),
// });

export default connect(mapStateToProps)(UsersDisplay);
