import * as React from 'react';
import type {InputAttributes, NumericFormatProps} from 'react-number-format';
import {NumericFormat} from 'react-number-format';

interface CustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
}

const DollarInput = React.forwardRef<NumericFormatProps<InputAttributes>, CustomProps>(
  function DollarInput(props, ref) {
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
        valueIsNumericString
        allowNegative={false}
        allowLeadingZeros={false}
        decimalScale={2}
        prefix="$"
      />
    );
  },
);

export default DollarInput;
