import { FC } from 'react';

export const DrawerClosed: FC<{}> = (props) => {
  return <div>{props.children}</div>;
};

DrawerClosed.displayName = 'DrawerClosed';
