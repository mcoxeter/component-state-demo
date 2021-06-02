import React from 'react';
import { FC } from 'react';
import { TextInput } from '../text-input/TextInput';
import { NameMachine } from './NameProps';
import styles from './NameForm.module.scss';

export interface NameFormProps {
  state: NameMachine;
}
export const NameForm: FC<NameFormProps> = ({ state: stateWrapper }) => {
  return (
    <form className={styles['component']} {...stateWrapper.toDataState()}>
      <TextInput
        id='fname'
        disabled={stateWrapper.isLocked()}
        caption='Firstname'
        value={stateWrapper.nameData.firstName}
        onChangeValue={(e) =>
          stateWrapper.send('CHANGE_DATA', {
            ...stateWrapper.nameData,
            firstName: e.target.value
          })
        }
      />
      <TextInput
        id='sname'
        disabled={stateWrapper.isLocked()}
        caption='Surname'
        value={stateWrapper.nameData.surname}
        onChangeValue={(e) =>
          stateWrapper.send('CHANGE_DATA', {
            ...stateWrapper.nameData,
            surname: e.target.value
          })
        }
      />
    </form>
  );
};

NameForm.displayName = 'NameForm';
