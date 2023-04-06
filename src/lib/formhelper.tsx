import React from 'react';
import { FormControl } from 'react-bootstrap';

type FieldProps = {
  input: any;
  meta: {
    touched: any;
    error: any;
    warning: any;
    invalid: any;
    valid: any;
    dirty: any;
    pristine: any;
    submitFailed: any;
  };
  type: string;
  placeholder: string;
  min: number;
  max: number;
  maxLength: number;
  className?: string;
  as?: any;
  name?: string;
  disabled?: boolean;
  readOnly?:boolean;

};
export const FieldInput = (props: FieldProps) => {
  return (
    <div className={props.className}>
      <FormControl
        type={props.input.type}
        placeholder={props.placeholder}
        name={props.name}
        as={props.as}
        min={props.min}
        max={props.max}
        disabled={props.disabled}
        maxLength={props.maxLength}
        value={props.input.value}
        onChange={props.input.onChange}
        onKeyPress={props.input.onKeyPress}
        readOnly = {props.readOnly}
        isValid={props.meta.valid}
        isInvalid={
          (props.meta.dirty && props.meta.invalid) ||
          (props.meta.submitFailed && props.meta.invalid)
        }
      />
      {!props.meta.valid &&
        ((props.meta.invalid && (
          <span className="invalid-feedback text-right">
            {props.meta.error}
          </span>
        )) ||
          (props.meta.warning && <span>{props.meta.warning}</span>))}
    </div>
  );
};
