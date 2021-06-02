import { FC } from 'react';
import { NameMachine } from './NameProps';
import styles from './NameSummary.module.scss';

export interface NameSummaryProps {
  state: NameMachine;
}
export const NameSummary: FC<NameSummaryProps> = ({ state: stateWrapper }) => {
  return (
    <div className={styles['component']}>
      <span
        className={styles['ellipsis']}
      >{`${stateWrapper.machine.context.data.firstName} ${stateWrapper.machine.context.data.surname}`}</span>
    </div>
  );
};

NameSummary.displayName = 'NameSummary';
