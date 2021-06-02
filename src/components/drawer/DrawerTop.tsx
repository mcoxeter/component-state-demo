import { FC } from 'react';

export const DrawerTop: FC<{}> = (props) => {
  return <div>{props.children}</div>;
};

DrawerTop.displayName = 'DrawerTop';
