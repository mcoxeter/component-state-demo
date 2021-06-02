import React, { useRef, FC, PropsWithChildren } from 'react';
import { ButtonLogic } from './logic/ButtonLogic';
import styles from './Button.module.scss';

export type ButtonInitialState = 'IDLE' | 'DISABLED' | 'INERT';
export type ButtonKind = 'incomplete' | 'complete';
export interface ButtonProps {
  /** Will apply focus the button when true. */
  applyFocus?: boolean;

  /** Sets the initial state of the button. */

  state?: ButtonInitialState;

  /** The kind of button. */
  kind?: ButtonKind;

  /** The click handler for the button. */
  onClick?: () => void;
}

export let Button: FC<PropsWithChildren<ButtonProps>> = (
  props: PropsWithChildren<ButtonProps>
) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <ButtonLogic {...props} buttonRef={buttonRef}>
      {(state, previousState, spreadAttributes) => {
        const classNames = ['component'].concat(
          props.kind ? props.kind : 'incomplete'
        );

        return (
          <button
            ref={buttonRef}
            type='button'
            className={classNames.map((x) => styles[x]).join(' ')}
            data-state={state}
            data-state-previous={previousState}
            {...spreadAttributes}
          >
            <Ring {...props}>{props.children}</Ring>
          </button>
        );
      }}
    </ButtonLogic>
  );
};

Button.defaultProps = {
  kind: 'incomplete',
  state: 'IDLE'
};

function Ring(props: React.PropsWithChildren<ButtonProps>) {
  return <div className={styles['button-ring']}>{props.children}</div>;
}
