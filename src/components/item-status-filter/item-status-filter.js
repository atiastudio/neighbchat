import React from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'ALL' },
    { name: 'ban', label: 'BAN' },
  ];

  render() {
    const buttons = this.buttons.map(({ name, label }) => {
      const { filtStatus, onStatusFiltred } = this.props;
      const activeClass =
        filtStatus === name ? 'btn-primary' : 'btn-outline-secondary';

      return (
        <button
          type="button"
          className={`btn ${activeClass}`}
          onClick={() => onStatusFiltred(name)}
          key={name}
        >
          {label}
        </button>
      );
    });

    return <div className="btn-group">{buttons}</div>;
  }
}
