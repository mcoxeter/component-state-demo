import { FC } from 'react';
import styles from './NameTopToolbar.module.scss';
import { Inline } from '../inline/Inline';
import { Button, ButtonInitialState, ButtonKind } from '../button/Button';
import { NameMachine } from './NameProps';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from '../icon/Icon';
export interface NameTopToolbarProps {
  stateWrapper: NameMachine;
}
export const NameTopToolbar: FC<NameTopToolbarProps> = ({ stateWrapper }) => {
  const isComplete = stateWrapper.isStepComplete();
  const locked = stateWrapper.isLocked();

  const lockedIconProp: IconProp = ['fas', locked ? 'lock' : 'unlock'];

  const workflowIconProp: IconProp = [
    'far',
    isComplete ? 'check-circle' : 'circle'
  ];

  const buttonKind: ButtonKind = isComplete ? 'complete' : 'incomplete';

  return (
    <div className={styles['component']} {...stateWrapper.toDataState()}>
      <Inline align='center' spacing='08du'>
        <div className={styles['lock']}>
          <Button
            kind={buttonKind}
            state={getLockedButtonState(stateWrapper)}
            onClick={() => changeLockedState(stateWrapper)}
          >
            <Inline padding={'4px'}>
              <Icon icon={lockedIconProp} />
            </Inline>
          </Button>
        </div>
        <div className={styles['workflow']}>
          <Button
            kind={buttonKind}
            state={getWorkflowButtonState(stateWrapper)}
            onClick={() => changeWorkflowState(stateWrapper)}
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

function getLockedButtonState(stateWrapper: NameMachine): ButtonInitialState {
  const result =
    !stateWrapper.isStepComplete() && stateWrapper.isDataComplete()
      ? 'IDLE'
      : 'DISABLED';
  return result;
}

function getWorkflowButtonState(stateWrapper: NameMachine): ButtonInitialState {
  return stateWrapper.isDataComplete() && stateWrapper.isLocked()
    ? 'IDLE'
    : 'DISABLED';
}

function changeLockedState(stateWrapper: NameMachine): void {
  stateWrapper.send(stateWrapper.isLocked() ? 'UN_LOCK' : 'LOCK');
}

function changeWorkflowState(stateWrapper: NameMachine): void {
  const action = stateWrapper.isStepComplete()
    ? 'STEP_INPROGRES'
    : 'STEP_COMPLETE';
  stateWrapper.send(action);

  if (action === 'STEP_COMPLETE') {
    stateWrapper.send('CLOSE_DRAW');
  }
  if (action === 'STEP_INPROGRES') {
    stateWrapper.send('OPEN_DRAW');
  }
}
