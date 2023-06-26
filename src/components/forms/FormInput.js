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
                       errors
                   }) {
    //HookForms kan niet gebruikt worden om een object te retourneren, daarom moet deze voorwaardelijk gerenderd worden
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