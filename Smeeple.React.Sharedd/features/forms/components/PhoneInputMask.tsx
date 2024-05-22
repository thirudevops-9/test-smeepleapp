import {forwardRef} from 'react';
import {IMaskInput} from 'react-imask';

interface Props {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
}

const PhoneInputMask = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {onChange, ...other} = props;

  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({target: {name: props.name, value: value as string}})}
      overwrite
    />
  );
});

PhoneInputMask.displayName = 'PhoneInputMask';

export default PhoneInputMask;
