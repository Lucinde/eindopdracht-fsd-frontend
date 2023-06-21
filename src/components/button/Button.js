import React from 'react';
import './Button.css';

function Button({variant, transform, buttonType, isDisabled, handleClick, iconLeft, iconRight, children}) {
    return (
        <button
            type={buttonType}
            disabled={isDisabled}
            className={`button ${variant} transform-${transform}`}
            onClick={handleClick}
        >
            {iconLeft}
            {children}
            {iconRight}
        </button>
    );
}

export default Button;