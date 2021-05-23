import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { NameTopToolbar } from './NameTopToolbar';
import styles from './NameTop.module.scss';
import { Inline } from '../inline/Inline';
import { Button } from '../button/Button';
export interface NameTopProps {
  caption: string;
}
export const NameTop: FC<NameTopProps> = ({ caption }) => {
  return (
    <div className={styles['component']}>
      <Inline align='center' spacing='08du' padding='8px'>
        <Button initialState={'IDLE'}>
          <Inline padding={'4px'}>
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </Inline>
        </Button>
        <div>{caption}</div>
        <div style={{ flex: '1 1 auto' }} />
        <NameTopToolbar />
      </Inline>
    </div>
  );
};
