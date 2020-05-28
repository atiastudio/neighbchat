import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './menu-item.css';

const MenuItem = ({ name, icon, active, onItemClick, unreadNum }) => {
  const unreadBadge = unreadNum ? (
    <span className="badge badge-primary unreadnum m-1">{unreadNum}</span>
  ) : null;

  return (
    <a
      href="##"
      className={`nav-link ${active}`}
      // data-toggle="tab"
      role="tab"
      aria-controls="chat"
      onClick={onItemClick}
    >
      <li className="nav-item">
        {/* <i className={`${icon} fa-4x menu-icon`} aria-hidden="true"></i> */}
        <FontAwesomeIcon icon={icon} size="4x" className="menu-icon" />
        <p className="m-0">
          {name}
          {unreadBadge}
        </p>
      </li>
    </a>
  );
};

export default MenuItem;
