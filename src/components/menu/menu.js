import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComments,
  faUsers,
  faHome,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';

import MenuItem from '../menu-item';
import MenuItemMob from '../menu-item-mob';

import { selectMsgUnreadNum, selectUserRole } from '../../selectors';

import './menu.css';

class Menu extends React.Component {
  state = {
    items: [
      {
        name: 'Chat',
        icon: faComments,
        id: 1,
      },
      {
        name: this.props.role === 'admin' ? 'Users' : 'Services',
        icon: this.props.role === 'admin' ? faUsers : faHome,
        id: 2,
      },
      {
        name: 'Requests',
        icon: faTasks,
        id: 3,
      },
    ],
  };

  render() {
    const { items } = this.state;
    const { activeItem, onItemClick, unreadNum } = this.props;
    const idx = items.findIndex((el) => el.name === activeItem);
    const pos = 3 + idx * 31;

    return (
      <React.Fragment>
        <div className="d-none col-sm-3 d-sm-flex flex-row p-0">
          <ul
            className="nav nav-tabs nav-tabs--vertical text-center"
            role="navigation"
          >
            {items.map(({ name, icon, id }) => (
              <MenuItem
                key={id}
                name={name}
                icon={icon}
                unreadNum={id === 1 ? unreadNum : null}
                onItemClick={() => onItemClick(name)}
                active={name === activeItem ? 'active' : ''}
              />
            ))}
          </ul>
        </div>
        <div className="d-block d-sm-none col-12 navbar-expand navbar-dark bg-dark mob-menu">
          <div className="slider" style={{ left: `${pos}%` }}></div>
          <ul className="navbar-nav justify-content-around text-center">
            {items.map(({ name, icon, id }) => (
              <MenuItemMob
                key={id}
                name={name}
                unreadNum={id === 1 ? unreadNum : null}
                onItemClick={() => onItemClick(name)}
                active={name === activeItem}
              />
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  unreadNum: selectMsgUnreadNum,
  role: selectUserRole,
});

export default connect(mapStateToProps)(Menu);
