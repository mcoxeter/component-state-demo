import React, { FC } from 'react';
import styles from './NameTopToolbar.module.scss';
import { Inline } from '../inline/Inline';
import { Button, ButtonInitialState, ButtonKind } from '../button/Button';
import {
  MachineSend,
  MachineType,
  toDataState,
  toStateString
} from './NameProps';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from '../icon/Icon';
export interface NameTopToolbarProps {
  machine: MachineType;
  send: MachineSend;
}
export const NameTopToolbar: FC<NameTopToolbarProps> = ({ machine, send }) => {
  const state: string = toStateString(machine.value);
  const lockedIconProp: IconProp = state.match(/unLocked/g)
    ? ['fas', 'unlock']
    : ['fas', 'lock'];

  const workflowIconProp: IconProp = state.match(/stepComplete/g)
    ? ['far', 'check-circle']
    : ['far', 'circle'];

  const buttonKind: ButtonKind = state.match(/stepComplete/g)
    ? 'complete'
    : 'incomplete';

  return (
    <div className={styles['component']} {...toDataState(machine.value)}>
      <Inline align='center' spacing='08du'>
        <div className={styles['workflow']}>
          <Button
            kind={buttonKind}
            initialState={getLockedButtonState(machine)}
            onClick={() => changeLockedState(machine, send)}
          >
            <Inline padding={'4px'}>
              <Icon icon={lockedIconProp} />
            </Inline>
          </Button>
        </div>
        <div className={styles['lock']}>
          <Button
            kind={buttonKind}
            initialState={getWorkflowButtonState(machine)}
            onClick={() => changeWorkflowState(machine, send)}
          >
            <Inline padding={'4px'}>
              <Icon icon={workflowIconProp} />
            </Inline>
          </Button>
        </div>
      </Inline>
    </div>
  );
};

function getLockedButtonState(machine: MachineType): ButtonInitialState {
  const stateString = toStateString(machine.value);
  const result = stateString.match(/stepInprogress_dataComplete/g)
    ? 'IDLE'
    : 'DISABLED';
  return result;
}

function getWorkflowButtonState(machine: MachineType): ButtonInitialState {
  const stateString = toStateString(machine.value);
  return stateString.match(/dataComplete_locked/g) ? 'IDLE' : 'DISABLED';
}

function changeLockedState(machine: MachineType, send: MachineSend): void {
  const stateString = toStateString(machine.value);
  const action = stateString.match(/locked/g) ? 'UN_LOCK' : 'LOCK';
  send({ type: action });
}

function changeWorkflowState(machine: MachineType, send: MachineSend): void {
  const stateString = toStateString(machine.value);
  const action = stateString.match(/stepInprogress/g)
    ? 'STEP_COMPLETE'
    : 'STEP_INPROGRES';
  send({ type: action });

  if (action === 'STEP_COMPLETE') {
    send({ type: 'CLOSE_DRAW' });
  }
  if (action === 'STEP_INPROGRES') {
    send({ type: 'OPEN_DRAW' });
  }
}
