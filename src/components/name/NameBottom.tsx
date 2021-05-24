import React, { FC } from 'react';
import { Icon } from '../icon/Icon';
import { Inline } from '../inline/Inline';
import styles from './NameBottom.module.scss';
import { MachineType, toDataState, toStateString } from './NameProps';
export interface NameBottomProps {
  machine: MachineType;
  firstName: string;
  surname: string;

  onChangeFirstName: (value: string) => void;
  onChangeSurname: (value: string) => void;
}
export const NameBottom: FC<NameBottomProps> = (props) => {
  const stateString = toStateString(props.machine.value);
  const attributes = stateString.match(/locked/g) ? { disabled: true } : {};

  const renderDrawOpen = () => (
    <>
      <div>
        <label htmlFor='fname'>Firstname</label>
        <Inline spacing={'16du'}>
          <input
            {...attributes}
            id='fname'
            type='text'
            value={props.firstName}
            autoComplete={'off'}
            onChange={(e) => props.onChangeFirstName(e.target.value)}
          />
          <Icon icon={['far', 'circle']} />
        </Inline>
      </div>
      <div>
        <label htmlFor='sname'>Surname</label>
        <Inline spacing={'16du'}>
          <input
            {...attributes}
            id='sname'
            type='text'
            autoComplete={'off'}
            value={props.surname}
            onChange={(e) => props.onChangeSurname(e.target.value)}
          />
          <Icon icon={['far', 'circle']} />
        </Inline>
      </div>
    </>
  );
  const renderDrawClosed = () => (
    <Inline spacing={'04du'}>
      <span>{props.firstName}</span>
      <span>{props.surname}</span>
    </Inline>
  );

  return (
    <form className={styles['component']} {...toDataState(props.machine.value)}>
      <div className={styles['container']}>
        {props.machine.matches({ drawer: 'drawOpen' })
          ? renderDrawOpen()
          : renderDrawClosed()}
      </div>
    </form>
  );
};
