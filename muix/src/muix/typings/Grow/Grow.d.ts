import * as React from 'react';
import { Omit } from 'reactxx-muix/typings';
import { Theme } from 'reactxx-muix/typings/styles/createMuiTheme';
import { TransitionProps } from 'reactxx-muix/typings/transitions/transition';

export interface GrowProps extends Omit<TransitionProps, 'timeout'> {
  theme?: Theme;
  timeout?: TransitionProps['timeout'] | 'auto';
}

declare const Grow: React.ComponentType<GrowProps>;

export default Grow;
