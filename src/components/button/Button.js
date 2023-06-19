import React from 'react';
import './Button.css';

function Button({variant, buttonType, isDisabled, handleClick, iconLeft, iconRight, children}) {
    return (
        <button
            type={buttonType}
            disabled={isDisabled}
            className={`button ${variant}`}
            onClick={handleClick}
        >
            {iconLeft}
            {children}
            {iconRight}
        </button>
    );
}

export default Button;