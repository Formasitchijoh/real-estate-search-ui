'use client'
import React from 'react';


export const CustomInput = (props: any) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
        {props.text && <p >{props.text}</p>}
        <div>
          <input
            className='border-[0.1px] h-16 border-[#7D8BA2] rounded-sm w-[50vw]'
            value={value}
            onChange={text => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            {...inputProps}
            placeholderTextColor={'black'}
          />
        </div>
        {hasError && <span>{errors[name]}</span>}
    </>
  );
};