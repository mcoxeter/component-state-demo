import { FC, useEffect, useState } from 'react';
import { NameBottom } from './NameBottom';
import styles from './Name.module.scss';
import { NameTop } from './NameTop';
import { nameMachine } from './Name.statemachine';
import { NameProps, StateWrapper, toStateString } from './NameProps';
import { useMachine } from '@xstate/react';

export const Name: FC<NameProps> = (props) => {
  /** The state machine. This is passed between all the components that work together. */
  const [machine, _send] = useMachine(nameMachine);

  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  const [prevState, setPrevState] = useState('');
  const send = (type: string, data?: {}): void => {
    setPrevState(toStateString(machine.value));
    _send({ type, data });
  };

  useEffect(
    () => {
      send('CHANGE_DATA', { firstName, surname });
      console.log('Here');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [firstName, surname]
  );

  const stateWrapper: StateWrapper = new StateWrapper(machine, send, prevState);

  return (
    <div className={styles['component']} {...stateWrapper.toDataState()}>
      <NameTop stateWrapper={stateWrapper} caption='Name' />
      <NameBottom
        stateWrapper={stateWrapper}
        firstName={firstName}
        surname={surname}
        onChangeFirstName={(value) => setFirstName(value)}
        onChangeSurname={(value) => setSurname(value)}
      ></NameBottom>
    </div>
  );
};
