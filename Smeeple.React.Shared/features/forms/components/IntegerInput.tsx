import * as React from 'react';
import type {InputAttributes, NumericFormatProps} from 'react-number-format';
import {NumericFormat} from 'react-number-format';

export interface IntegerInputProps {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
  allowNegatives?: boolean;
  minLength?: number;
  maxLength?: number;
}

const IntegerInput = React.forwardRef<NumericFormatProps<InputAttributes>, IntegerInputProps>(
  function IntegerInput(props, ref) {
    const {onChange, ...other} = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
      />
    );
  },
);

export default IntegerInput;
