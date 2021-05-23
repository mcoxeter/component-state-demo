import { FC } from 'react';
import styles from './NameBottom.module.scss';
export interface NameBottomProps {
  firstName: string;
  surname: string;

  onChangeFirstName: (value: string) => void;
  onChangeSurname: (value: string) => void;
}
export const NameBottom: FC<NameBottomProps> = (props) => {
  return (
    <form className={styles['component']}>
      <div>
        <label htmlFor='fname'>Firstname</label>
        <input
          id='fname'
          type='text'
          value={props.firstName}
          autoComplete={'off'}
          onChange={(e) => props.onChangeFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='sname'>Surname</label>
        <input
          id='sname'
          type='text'
          autoComplete={'off'}
          value={props.surname}
          onChange={(e) => props.onChangeSurname(e.target.value)}
        />
      </div>
    </form>
  );
};
