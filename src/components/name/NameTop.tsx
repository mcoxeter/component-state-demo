import React, { FC } from 'react';
import { NameTopToolbar } from './NameTopToolbar';
import styles from './NameTop.module.scss';
import { Inline } from '../inline/Inline';
import { Button } from '../button/Button';
import { NameMachine } from './NameProps';
import { Icon } from '../icon/Icon';
export interface NameTopProps {
  state: NameMachine;
}
export const NameTop: FC<NameTopProps> = ({ state: stateWrapper }) => {
  const isClosed = stateWrapper.isDrawClosed();
  const complete = stateWrapper.iscompleted();

  const toggleDraw = () => {
    stateWrapper.send(stateWrapper.isDrawClosed() ? 'OPEN_DRAW' : 'CLOSE_DRAW');
  };

  return (
    <div className={styles['component']} {...stateWrapper.toDataState()}>
      <Inline align='center' spacing='08du' padding='8px'>
        <Button
          kind={complete ? 'complete' : 'incomplete'}
          onClick={toggleDraw}
        >
          <Inline padding={'4px'} spacing={'08du'}>
            <Icon icon={isClosed ? 'angle-up' : 'angle-down'} />
            <div>Name</div>
          </Inline>
        </Button>
        <div className={styles['expander']} />
        <NameTopToolbar stateWrapper={stateWrapper} />
      </Inline>
    </div>
  );
};

NameTop.displayName = 'NameTop';
