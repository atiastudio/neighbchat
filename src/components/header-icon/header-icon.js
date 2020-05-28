import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserProfile } from '../../selectors';
import { userRequested } from '../../actions';

import './header-icon.css';

class HeaderIcon extends React.Component {
  // --------- STATE ---------
  state = {
    dropdown: false,
  };

  // --------- FUNCTIONS ---------
  handleClick = (event) => {
    event.preventDefault();
    this.setState((prevState, prevProps) => {
      return { dropdown: !prevState.dropdown };
    });
  };

  hadnleBlur = (event) => {
    this.timeOutId = setTimeout(() => {
      this.setState({ dropdown: false });
    });
  };

  handleFocus = (event) => {
    clearTimeout(this.timeOutId);
  };

  handleProfileClick = (event) => {
    this.setState({ dropdown: false });
  };

  // --------- RENDER ---------
  render() {
    const { dropdown } = this.state;
    const {
      fetchUser,
      userProfile: { name, photo },
    } = this.props;
    return (
      <li
        className={`nav-item dropdown`}
        onFocus={this.handleFocus}
        onBlur={this.hadnleBlur}
      >
        <a
          href="##"
          className="nav-link dropdown-toggle"
          onClick={this.handleClick}
        >
          <span className="d-none d-sm-inline">{name}</span>
          <img
            className="nav__user-photo"
            // src={`https://neibchat-api.herokuapp.com/img/users/${photo}`}
            src={`http://localhost:8000/img/users/${photo}`}
            alt="User"
          />
        </a>
        <div className={`dropdown-menu ${dropdown ? 'show' : ''}`}>
          <Link
            className="dropdown-item"
            to="/profile"
            onClick={this.handleProfileClick}
          >
            Profile
          </Link>
          <Link className="dropdown-item" onClick={fetchUser} to="/login">
            Logout
          </Link>
        </div>
      </li>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userProfile: selectUserProfile,
});

const reqParams = ['logout'];

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(userRequested({ reqParams })),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderIcon);
