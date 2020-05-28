import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import './error-indicator.css';

const ErrorIndicator = () => {
  return (
    <div className="error-indicator">
      <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
      <span className="boom">..Упс!!!</span>
      <span>что-то пошло не так...</span>
      <span>(но мы, вероятно, уже чиним - попробуйте зайти позже)</span>
    </div>
  );
};

export default ErrorIndicator;
