import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { Theme } from 'reactxx-muix/typings/styles/createMuiTheme';
import { TransitionProps } from 'reactxx-muix/typings/transitions/transition';

export interface CollapseProps extends StandardProps<TransitionProps, CollapseClassKey, 'timeout'> {
  children?: React.ReactNode;
  collapsedHeight?: string;
  component?: React.ReactType<CollapseProps>;
  theme?: Theme;
  timeout?: TransitionProps['timeout'] | 'auto';
}

export type CollapseClassKey = 'container' | 'entered';

declare const Collapse: React.ComponentType<CollapseProps>;

export default Collapse;
