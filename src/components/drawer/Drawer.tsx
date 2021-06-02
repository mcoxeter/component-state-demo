import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import styles from './Drawer.module.scss';

export interface DrawerProps {
  open: boolean;
  wasOpen: boolean;
}

enum DrawStates {
  Open = 'open',
  Closed = 'closed',
  ClosedAreaFadingOut = 'closedAreaFadingOut',
  ClosedAreaFadingIn = 'closedAreaFadingIn',
  DrawOpening = 'drawOpening',
  DrawClosing = 'drawClosing',
  OpenAreaFadingIn = 'openAreaFadingIn',
  OpenAreaFadingOut = 'openAreaFadingOut'
}

interface AnimationStep {
  state: DrawStates;
  timing: number;
}

type ReactChildType =
  | React.ReactChild
  | React.ReactFragment
  | React.ReactPortal
  | undefined;

const fadeDuration = 200;
const openCloseDuration = 200;

const openAnimation: AnimationStep[] = [
  { state: DrawStates.ClosedAreaFadingOut, timing: 0 },
  { state: DrawStates.DrawOpening, timing: fadeDuration },
  { state: DrawStates.OpenAreaFadingIn, timing: openCloseDuration },
  { state: DrawStates.Open, timing: fadeDuration }
];
const closeAnimation: AnimationStep[] = [
  { state: DrawStates.OpenAreaFadingOut, timing: 0 },
  { state: DrawStates.DrawClosing, timing: fadeDuration },
  { state: DrawStates.ClosedAreaFadingIn, timing: openCloseDuration },
  { state: DrawStates.Closed, timing: fadeDuration }
];

export const Drawer: FC<DrawerProps> = ({ children, open, wasOpen }) => {
  const [animation, setAnimation] = useState<AnimationStep[]>([]);
  const [currentAnimation, setcurrentAnimation] = useState<AnimationStep>();

  useEffect(() => {
    if (open && !wasOpen) {
      setAnimation([...openAnimation]);
    }

    if (!open && wasOpen) {
      setAnimation([...closeAnimation]);
    }
  }, [open, wasOpen]);

  useEffect(() => {
    const [nextAnimation, ...tail] = animation;
    if (nextAnimation) {
      setTimeout(() => {
        setcurrentAnimation(nextAnimation);
        setAnimation(tail);
      }, nextAnimation.timing);
    }
  }, [animation]);

  return (
    <div
      className={styles['component']}
      data-state={currentAnimation?.state ?? 'closed'}
    >
      <div className={styles['drawer-top']}>
        {findChild(children, 'DrawerTop')}
      </div>
      <div className={styles['drawer-area']}>
        <div className={styles['closed-area']}>
          {findChild(children, 'DrawerClosed')}
        </div>
        <div className={styles['open-area']}>
          {findChild(children, 'DrawerOpened')}
        </div>
      </div>
    </div>
  );
};

function findChild(
  children: React.ReactNode,
  displayName: string
): ReactChildType {
  return React.Children.toArray(children).find(
    (x) => ((x as any)?.type?.displayName ?? '') === displayName
  );
}

Drawer.displayName = 'Drawer';
