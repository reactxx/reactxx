import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { Breakpoint } from 'reactxx-muix/typings/styles/createBreakpoints';

export interface HiddenProps extends StandardProps<{}, never> {
  implementation?: 'js' | 'css';
  initialWidth?: Breakpoint;
  lgDown?: boolean;
  lgUp?: boolean;
  mdDown?: boolean;
  mdUp?: boolean;
  only?: Breakpoint | Array<Breakpoint>;
  smDown?: boolean;
  smUp?: boolean;
  xlDown?: boolean;
  xlUp?: boolean;
  xsDown?: boolean;
  xsUp?: boolean;
}

declare const Hidden: React.ComponentType<HiddenProps>;

export default Hidden;
