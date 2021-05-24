import React, { FC, useEffect, useState } from 'react';
import { NameBottom } from './NameBottom';
import styles from './Name.module.scss';
import { NameTop } from './NameTop';
import { NameData, nameMachine } from './Name.statemachine';
import { useMachine } from '@xstate/react';
import { NameProps, toDataState } from './NameProps';

export const Name: FC<NameProps> = (props) => {
  const [machine, send] = useMachine(nameMachine);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() => {
    const data: NameData = { firstName, surname };
    send({ type: 'CHANGE_DATA', data });
  }, [send, firstName, surname]);

  return (
    <div className={styles['component']} {...toDataState(machine.value)}>
      <NameTop machine={machine} caption='Name' send={send} />
      <NameBottom
        machine={machine}
        firstName={firstName}
        surname={surname}
        onChangeFirstName={(value) => setFirstName(value)}
        onChangeSurname={(value) => setSurname(value)}
      ></NameBottom>
    </div>
  );
};
