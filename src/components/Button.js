import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';  // Add styles here

const Button = ({ label, onClick, styleType, disabled }) => {
  return (
    <button
      className={`btn ${styleType} ${disabled ? 'btn-disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  styleType: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  styleType: 'primary',
  disabled: false,
};

export default Button;