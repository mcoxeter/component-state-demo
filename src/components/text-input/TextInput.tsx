import { ChangeEventHandler, FC } from 'react';
import { Check } from '../check/Check';
import { Inline } from '../inline/Inline';
export interface TextInputProps {
  caption: string;
  disabled: boolean;
  id: string;
  value: string;
  onChangeValue?: ChangeEventHandler<HTMLInputElement>;
}
export const TextInput: FC<TextInputProps> = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.caption}</label>
      <Inline spacing={'16du'}>
        <input
          disabled={props.disabled}
          id={props.id}
          type='text'
          value={props.value}
          autoComplete={'off'}
          onChange={props.onChangeValue}
        />
        <Check value={props.value.length > 0} />
      </Inline>
    </div>
  );
};
