import { FC } from 'react';

export const DrawerOpened: FC<{}> = (props) => {
  return <div>{props.children}</div>;
};

DrawerOpened.displayName = 'DrawerOpened';
