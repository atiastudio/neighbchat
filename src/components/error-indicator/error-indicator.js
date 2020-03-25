import React from 'react';

import './error-indicator.css';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <i className="fa fa-exclamation-triangle fa-3x" aria-hidden="true"></i>
      <span className="boom">..Упс!!!</span>
      <span>что-то пошло не так...</span>
      <span>(но мы, вероятно, уже чиним - попробуйте зайти позже)</span>
    </div>
  );
};

export default ErrorIndicator;
