import { FC } from 'react';
import { Icon } from '../icon/Icon';
import { Inline } from '../inline/Inline';
import { TextInput } from '../text-input/TextInput';
import styles from './NameBottom.module.scss';
import { StateWrapper } from './NameProps';
export interface NameBottomProps {
  stateWrapper: StateWrapper;
  firstName: string;
  surname: string;

  onChangeFirstName: (value: string) => void;
  onChangeSurname: (value: string) => void;
}
export const NameBottom: FC<NameBottomProps> = (props) => {
  const renderDrawOpen = () => (
    <>
      <TextInput
        id='fname'
        disabled={props.stateWrapper.isLocked()}
        caption='Firstname'
        value={props.firstName}
        onChangeValue={(e) => props.onChangeFirstName(e.target.value)}
      />
      <TextInput
        id='sname'
        disabled={props.stateWrapper.isLocked()}
        caption='Surname'
        value={props.surname}
        onChangeValue={(e) => props.onChangeSurname(e.target.value)}
      />
    </>
  );
  const renderDrawClosed = () => (
    <span
      className={styles['summary-caption']}
    >{`${props.firstName} ${props.surname}`}</span>
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
