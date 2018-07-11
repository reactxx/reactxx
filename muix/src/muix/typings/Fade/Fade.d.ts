import * as React from 'react';
import { Theme } from 'reactxx-muix/typings/styles/createMuiTheme';
import { TransitionProps } from 'reactxx-muix/typings/transitions/transition';

export interface FadeProps extends TransitionProps {
  theme?: Theme;
}

declare const Fade: React.ComponentType<FadeProps>;

export default Fade;
