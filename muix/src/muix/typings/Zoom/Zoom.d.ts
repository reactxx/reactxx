import * as React from 'react';
import { Theme } from 'reactxx-muix/typings/styles/createMuiTheme';
import { TransitionProps } from 'reactxx-muix/typings/transitions/transition';

export interface ZoomProps extends TransitionProps {
  theme?: Theme;
}

declare const Zoom: React.ComponentType<ZoomProps>;

export default Zoom;
