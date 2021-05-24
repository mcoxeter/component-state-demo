import React, { FC } from 'react';
import { NameTopToolbar } from './NameTopToolbar';
import styles from './NameTop.module.scss';
import { Inline } from '../inline/Inline';
import { Button, ButtonKind } from '../button/Button';
import {
  MachineSend,
  MachineType,
  toDataState,
  toStateString
} from './NameProps';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from '../icon/Icon';
export interface NameTopProps {
  machine: MachineType;
  send: MachineSend;
  caption: string;
}
export const NameTop: FC<NameTopProps> = ({ caption, machine, send }) => {
  const state: string = toStateString(machine.value);
  const lockedIconProp: IconProp = state.match(/drawClosed/g)
    ? ['fas', 'angle-up']
    : ['fas', 'angle-down'];
  const buttonKind: ButtonKind = state.match(/stepComplete/g)
    ? 'complete'
    : 'incomplete';

  return (
    <div className={styles['component']} {...toDataState(machine.value)}>
      <Inline align='center' spacing='08du' padding='8px'>
        <Button
          initialState={'IDLE'}
          kind={buttonKind}
          onClick={() => changeDrawState(machine, send)}
        >
          <Inline padding={'4px'}>
            <Icon icon={lockedIconProp} />
          </Inline>
        </Button>
        <div>{caption}</div>
        <div style={{ flex: '1 1 auto' }} />
        <NameTopToolbar machine={machine} send={send} />
      </Inline>
    </div>
  );
};
function changeDrawState(machine: MachineType, send: MachineSend): void {
  const stateString = toStateString(machine.value);
  const action = stateString.match(/drawClosed/g) ? 'OPEN_DRAW' : 'CLOSE_DRAW';
  send({ type: action });
}
