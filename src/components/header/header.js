import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUserId } from '../../selectors';

import './header.css';

import logo from './logo192.png';

import HeaderIcon from '../header-icon';

const Header = ({ userId }) => {
  const userIcon = userId ? (
    <HeaderIcon />
  ) : (
    <Link className="nav-link" to="/login">
      Log In
    </Link>
  );

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-sm-1 py-1 py-sm-2 my-header">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="logo" alt="logo" />
          &nbsp;NeibChat
        </Link>
        <ul className="navbar-nav">{userIcon}</ul>
      </div>
      {/* <div className="bg-dark strip"></div> */}
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
});

export default connect(mapStateToProps)(Header);
