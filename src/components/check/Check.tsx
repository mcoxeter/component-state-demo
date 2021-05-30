import React, { FC } from 'react';
import { Icon } from '../icon/Icon';
import styles from './Check.module.scss';
export interface CheckProps {
  value: boolean;
}
export const Check: FC<CheckProps> = ({ value }) => {
  return value ? (
    <div className={styles['check-icon']}>
      <Icon icon={['far', 'check-circle']} />
    </div>
  ) : (
    <div className={styles['uncheck-icon']}>
      <Icon icon={['far', 'check-circle']} />
    </div>
  );
};
