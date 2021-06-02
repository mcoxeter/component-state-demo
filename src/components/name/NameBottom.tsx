import { FC, useEffect, useState } from 'react';
import { TextInput } from '../text-input/TextInput';
import styles from './NameBottom.module.scss';
import { NameMachine } from './NameProps';
export interface NameBottomProps {
  stateWrapper: NameMachine;
}
export const NameBottom: FC<NameBottomProps> = (props) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(
    () => {
      props.stateWrapper.send('CHANGE_DATA', { firstName, surname });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [firstName, surname]
  );

  const renderDrawOpen = () => (
    <>
      <TextInput
        id='fname'
        disabled={props.stateWrapper.isLocked()}
        caption='Firstname'
        value={firstName}
        onChangeValue={(e) => setFirstName(e.target.value)}
      />
      <TextInput
        id='sname'
        disabled={props.stateWrapper.isLocked()}
        caption='Surname'
        value={surname}
        onChangeValue={(e) => setSurname(e.target.value)}
      />
    </>
  );
  const renderDrawClosed = () => (
    <span
      className={styles['summary-caption']}
    >{`${firstName} ${surname}`}</span>
  );

  return (
    <form className={styles['component']} {...props.stateWrapper.toDataState()}>
      <div className={styles['container']}>
        {props.stateWrapper.machine.matches({ drawer: 'drawOpen' })
          ? renderDrawOpen()
          : renderDrawClosed()}
      </div>
    </form>
  );
};
