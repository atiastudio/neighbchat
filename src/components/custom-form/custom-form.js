import React from 'react';
import { Link } from 'react-router-dom';

import './custom-form.css';

import ErrorMessage from '../error-message';

const CustomForm = ({
  title,
  handleSubmit,
  children,
  handleChange,
  body,
  links,
}) => (
  <div className="card">
    <div className="card-header">
      <h4>{title}</h4>
    </div>
    <div className="card-body">
      <form className="pt-2" onSubmit={handleSubmit}>
        <ErrorMessage />
        {
          // children
          React.Children.map(children, (child) => {
            const addProps = child.props.name ? { handleChange, body } : {};
            return React.cloneElement(child, addProps);
          })
        }
      </form>
    </div>
    <div className="card-footer d-flex justify-content-between">
      {links
        ? links.map(({ key, ltitle, llink }) => (
            <Link key={key} to={llink}>
              {ltitle}
            </Link>
          ))
        : null}
    </div>
  </div>
);

export default CustomForm;
