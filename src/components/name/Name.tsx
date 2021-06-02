import { FC, useState } from 'react';
import styles from './Name.module.scss';
import { NameTop } from './NameTop';
import { nameMachine } from './Name.statemachine';
import { NameProps, NameMachine, toStateString } from './NameProps';
import { useMachine } from '@xstate/react';
import { Drawer } from '../drawer/Drawer';
import { DrawerOpened } from '../drawer/DrawerOpened';
import { DrawerClosed } from '../drawer/DrawerClosed';
import { DrawerTop } from '../drawer/DrawerTop';
import { NameForm } from './NameForm';
import { NameSummary } from './NameSummary';
export const Name: FC<NameProps> = (props) => {
  /** The state machine. This is passed between all the components that work together. */
  const [machine, _send] = useMachine(nameMachine);

  const [prevState, setPrevState] = useState('');

  /** This send also keeps track of the previous state */
  const send = (type: string, data?: {}): void => {
    setPrevState(toStateString(machine.value));
    _send({ type, data });
  };

  const state: NameMachine = new NameMachine(machine, send, prevState);

  let isDrawOpem = !state.isDrawClosed();
  let wasDrawOpen = state.previousState.match(/drawOpen/) ? true : false;

  return (
    <div className={styles['component']} {...state.toDataState()}>
      <Drawer open={isDrawOpem} wasOpen={wasDrawOpen}>
        <DrawerTop>
          <NameTop state={state} />
        </DrawerTop>
        <DrawerOpened>
          <NameForm state={state} />
        </DrawerOpened>
        <DrawerClosed>
          <NameSummary state={state} />
        </DrawerClosed>
      </Drawer>
    </div>
  );
};

Name.displayName = 'Name';
