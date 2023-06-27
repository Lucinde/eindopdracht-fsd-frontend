import React from 'react';

function FormInput({
                       name,
                       inputType,
                       children,
                       register,
                       noLabel,
                       placeholderText,
                       required,
                       validationSchema,
                       className,
                       defaultValue,
                       errors
                   }) {

    //Voor het geval er geen HookForms gebruikt wordt
    const generateRegister = () => {
        if (register) {
            return {
                ...register(name, validationSchema)
            }
        } else {
            return {}
        }
    }

    if (inputType === "checkbox") {
        return (
            <>
                <label htmlFor={`${name}-field`}>
                    <input
                        type={inputType}
                        id={`${name}-field`}
                        name={name}
                        className={className}
                        placeholder={placeholderText}
                        value={defaultValue}
                        {...generateRegister()}
                    />
                    {children}
                </label>
                {errors && errors[name] && (
                    <span className="error">{errors[name]?.message}</span>
                )}
            </>
        )
    } else if (noLabel) {
        return (
            <>
                <input
                    type={inputType}
                    id={`${name}-field`}
                    name={name}
                    className={className}
                    placeholder={placeholderText}
                    value={defaultValue}
                    {...generateRegister()}
                />
                {errors && errors[name] && (
                    <span className="error">{errors[name]?.message}</span>
                )}
            </>
        )
    } else {
        return (
            <>
                <label htmlFor={`${name}-field`}>
                    {children}
                    {required && "*"}
                    <input
                        type={inputType}
                        id={`${name}-field`}
                        name={name}
                        className={className}
                        placeholder={placeholderText}
                        value={defaultValue}
                        {...generateRegister()}
                    />
                </label>
                {errors && errors[name] && (
                    <span className="error">{errors[name]?.message}</span>
                )}
            </>
        )
    }


}

export default FormInput;