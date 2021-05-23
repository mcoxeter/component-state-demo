import React, { FC, useEffect, useState } from 'react';
import { NameBottom } from './NameBottom';
import styles from './Name.module.scss';
import { NameTop } from './NameTop';
import { NameData, nameMachine } from './Name.statemachine';
import { useMachine } from '@xstate/react';
export interface NameProps {}
export const Name: FC<NameProps> = (props) => {
  const [machine, setMachine] = useMachine(nameMachine);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() => {
    const data: NameData = { firstName, surname };
    setMachine({ type: 'CHANGE_DATA', data });
  }, [setMachine, firstName, surname]);

  const states = asValuesCombinded(machine.value);
  console.log(states);

  return (
    <div className={styles['component']}>
      <NameTop caption='Name' />
      <NameBottom
        firstName={firstName}
        surname={surname}
        onChangeFirstName={(value) => setFirstName(value)}
        onChangeSurname={(value) => setSurname(value)}
      ></NameBottom>
    </div>
  );
};

function asValuesCombinded(obj: {}): string[] {
  return Object.values(obj).flatMap((x) => (x as String).split('_'));
}
