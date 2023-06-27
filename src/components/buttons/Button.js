import React from 'react';
import './Button.css';

function Button({variant, transform, buttonType, isDisabled, handleClick, iconLeft, iconRight, textAlign, children}) {
    return (
        <button
            type={buttonType}
            disabled={isDisabled}
            className={`button ${variant} ${transform ? `transform-${transform}` : ''} ${textAlign ? `${textAlign}` : ''}`}
            onClick={handleClick}
        >
            {iconLeft && <img src={iconLeft} alt="icon previous" className="icon-button"/>}
            {children}
            {iconRight && <img src={iconRight} alt="icon next" className="icon-button"/>}
        </button>
    );
}

export default Button;