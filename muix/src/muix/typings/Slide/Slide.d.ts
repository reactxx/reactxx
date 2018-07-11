import * as React from 'react';
import { Theme } from 'reactxx-muix/typings/styles/createMuiTheme';
import { TransitionProps } from 'reactxx-muix/typings/transitions/transition';

export interface SlideProps extends TransitionProps {
  direction: 'left' | 'right' | 'up' | 'down';
  theme?: Theme;
}

declare const Slide: React.ComponentType<SlideProps>;

export default Slide;
