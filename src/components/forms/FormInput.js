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
                        {...register(name)} />
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
                    {...register(name)} />
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
                        {...register(name, validationSchema)} />
                </label>
                {errors && errors[name] && (
                    <span className="error">{errors[name]?.message}</span>
                )}
            </>
        )
    }


}

export default FormInput;