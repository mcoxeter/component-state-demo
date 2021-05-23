import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NameTopToolbar.module.scss';
import { Inline } from '../inline/Inline';
import { Button } from '../button/Button';
export interface NameTopToolbarProps {}
export const NameTopToolbar: FC<NameTopToolbarProps> = (props) => {
  return (
    <div className={styles['component']}>
      <Inline align='center' spacing='08du'>
        <Button initialState={'IDLE'}>
          <Inline padding={'4px'}>
            <FontAwesomeIcon icon={['fas', 'lock']} />
          </Inline>
        </Button>
        <Button initialState={'IDLE'}>
          <Inline padding={'4px'}>
            <FontAwesomeIcon
              icon={['fas', 'circle']}
              transform={{ size: 12 }}
              mask={['fas', 'circle']}
            />
          </Inline>
        </Button>
      </Inline>
    </div>
  );
};
