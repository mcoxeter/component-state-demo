import React, { FC } from 'react';
import { NameTopToolbar } from './NameTopToolbar';
import styles from './NameTop.module.scss';
import { Inline } from '../inline/Inline';
import { Button, ButtonKind } from '../button/Button';
import { StateWrapper } from './NameProps';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from '../icon/Icon';
export interface NameTopProps {
  stateWrapper: StateWrapper;
  caption: string;
}
export const NameTop: FC<NameTopProps> = ({ caption, stateWrapper }) => {
  const drawIconProp: IconProp = stateWrapper.isDrawClosed()
    ? ['fas', 'angle-up']
    : ['fas', 'angle-down'];
  const buttonKind: ButtonKind = stateWrapper.isStepComplete()
    ? 'complete'
    : 'incomplete';

  return (
    <div className={styles['component']} {...stateWrapper.toDataState()}>
      <Inline align='center' spacing='08du' padding='8px'>
        <Button
          initialState={'IDLE'}
          kind={buttonKind}
          onClick={() => changeDrawState(stateWrapper)}
        >
          <Inline padding={'4px'} spacing={'08du'}>
            <Icon icon={drawIconProp} />
            <div>{caption}</div>
          </Inline>
        </Button>
        <div style={{ flex: '1 1 auto' }} />
        <NameTopToolbar stateWrapper={stateWrapper} />
      </Inline>
    </div>
  );
};
function changeDrawState(stateWrapper: StateWrapper): void {
  const action = stateWrapper.isDrawClosed() ? 'OPEN_DRAW' : 'CLOSE_DRAW';
  stateWrapper.send(action);
}
