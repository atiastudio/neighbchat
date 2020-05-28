import React from 'react';

import './menu-item-mob.css';

const MenuItemMob = ({ name, active, onItemClick, unreadNum }) => {
  const activeClass = active ? 'active' : '';
  const unreadBadge = unreadNum ? (
    <span className="badge badge-primary unreadnum m-1">{unreadNum}</span>
  ) : null;

  return (
    <li className="nav-item mob-item text-lowercase" onClick={onItemClick}>
      <a href="##" className={`nav-link py-1 ${activeClass}`}>
        {name}
        {unreadBadge}
      </a>
    </li>
  );
};

export default MenuItemMob;
