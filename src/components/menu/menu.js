import React from 'react';

import './menu.css';

const Menu = () => {
  return (
    <div className="col-3 d-flex flex-row p-0">
      <ul
        className="nav nav-tabs nav-tabs--vertical nav-tabs--left text-center"
        role="navigation"
      >
        <a
          href="#chat"
          className="nav-link active"
          data-toggle="tab"
          role="tab"
          aria-controls="chat"
        >
          <li className="nav-item">
            <i className="fa fa-comments-o fa-4x" aria-hidden="true"></i>
            <p>Чат</p>
          </li>
        </a>
        <a
          href="#services"
          className="nav-link"
          data-toggle="tab"
          role="tab"
          aria-controls="services"
        >
          <li className="nav-item">
            <i className="fa fa-taxi fa-4x" aria-hidden="true"></i>
            <p>Сервисы</p>
          </li>
        </a>
        <a
          href="#realest"
          className="nav-link"
          data-toggle="tab"
          role="tab"
          aria-controls="realest"
        >
          <li className="nav-item">
            <i className="fa fa-home fa-4x" aria-hidden="true"></i>
            <p>Недвижимость</p>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default Menu;
