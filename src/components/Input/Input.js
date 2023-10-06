import React from 'react';
import './Input.scss';
import { Controller } from 'react-hook-form';

function Input({ label = '', type, name, iconSrc, placeholder = '', control, rules }) {
  return (
    <div className="container">
      {label && <label>{label}</label>}
      <div className="Input">
        {iconSrc && <img alt={name} src={iconSrc} />}
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <input
              type={type}
              id={name}
              placeholder={placeholder ? placeholder : `Introduz o teu ${label.toLowerCase()}`}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
}

export default Input;

