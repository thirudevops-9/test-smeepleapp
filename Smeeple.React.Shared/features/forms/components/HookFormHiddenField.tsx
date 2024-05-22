import {useController} from 'react-hook-form';
import type {FieldValues, UseControllerProps} from 'react-hook-form';

type Props<T extends FieldValues> = UseControllerProps<T> & {
  defaultValue?: string;
};

function HookFormHiddenField<T extends FieldValues>({defaultValue, ...rest}: Props<T>) {
  const {field} = useController(rest);
  return <input type="hidden" {...rest} {...field} defaultValue={defaultValue} />;
}

export default HookFormHiddenField;
