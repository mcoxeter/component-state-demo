import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import styles from './Icon.module.scss';

export interface IconProps {
  icon: IconProp;
  size?: SizeProp;
}

export const Icon: FC<IconProps> = ({ icon, size }) => {
  return (
    <div className={styles['component']}>
      <FontAwesomeIcon size={size} icon={icon} />
    </div>
  );
};
