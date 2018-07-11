import * as React from 'react';
import { Omit } from 'reactxx-muix/typings';
import { DrawerProps } from 'reactxx-muix/typings/Drawer';

export interface SwipeableDrawerProps extends Omit<DrawerProps, 'onClose' | 'open'> {
  disableBackdropTransition?: boolean;
  disableDiscovery?: boolean;
  disableSwipeToOpen?: boolean;
  onClose: React.ReactEventHandler<{}>;
  onOpen: React.ReactEventHandler<{}>;
  open: boolean;
  swipeAreaWidth?: number;
}

declare const SwipeableDrawer: React.ComponentType<SwipeableDrawerProps>;

export default SwipeableDrawer;
