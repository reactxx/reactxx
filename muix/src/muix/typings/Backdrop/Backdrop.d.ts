import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { FadeProps } from 'reactxx-muix/typings/Fade';
import { TransitionProps } from 'reactxx-muix/typings/transitions/transition';

export interface BackdropProps
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement> & Partial<FadeProps>,
      BackdropClassKey
    > {
  invisible?: boolean;
  onClick?: React.ReactEventHandler<{}>;
  open: boolean;
  transitionDuration?: TransitionProps['timeout'];
}

export type BackdropClassKey = 'root' | 'invisible';

declare const Backdrop: React.ComponentType<BackdropProps>;

export default Backdrop;
