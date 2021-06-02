import { useMachine } from '@xstate/react';
import React, { ButtonHTMLAttributes, useState } from 'react';
import { ButtonProps } from '../Button';
import { buttonMachine } from './ButtonLogic.statemachine';

export interface ButtonLogicProps extends ButtonProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
  children: (
    state: string,
    previousState: string,
    spreadAttributes: ButtonSpread
  ) => JSX.Element;
}

type SpreadAttributes = 'onFocus' | 'onBlur' | 'onClick' | 'disabled';
export interface ButtonSpread
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, SpreadAttributes> {}

export function ButtonLogic(props: ButtonLogicProps): JSX.Element {
  const [machine, setMachine] = useMachine(buttonMachine);
  const [prevState, setPrevState] = useState('');

  const setState = (newState: string): void => {
    setPrevState(`${machine.value}`);
    setMachine({ type: newState });
  };

  React.useEffect(() => {
    setMachine({ type: props?.state ?? 'incomplete' });
  }, [props.state, setMachine]);

  React.useEffect(() => {
    if (props.applyFocus && props.buttonRef) {
      props.buttonRef.current?.focus();
    }
  }, [props.applyFocus, props.buttonRef]);

  const spreadAttributes: ButtonSpread = {
    onBlur: () => setState('BLUR'),
    onFocus: () => setState('FOCUS'),
    onClick: props.onClick,
    disabled: machine.matches('disabled') || machine.matches('inert')
  };

  return props.children(`${machine.value}`, prevState, spreadAttributes);
}
