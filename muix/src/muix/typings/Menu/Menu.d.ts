import * as React from 'react';
import { PopoverProps, PopoverClassKey } from 'reactxx-muix/typings/Popover';
import { MenuListProps } from 'reactxx-muix/typings/MenuList';
import { PaperProps } from 'reactxx-muix/typings/Paper';
import { StandardProps } from 'reactxx-muix/typings';
import { TransitionHandlerProps, TransitionProps } from 'reactxx-muix/typings/transitions/transition';
import { ClassNameMap } from 'reactxx-muix/typings/styles/withStyles';

export interface MenuProps
  extends StandardProps<PopoverProps & Partial<TransitionHandlerProps>, MenuClassKey> {
  anchorEl?: HTMLElement;
  MenuListProps?: Partial<MenuListProps>;
  PaperProps?: Partial<PaperProps>;
  PopoverClasses?: Partial<ClassNameMap<PopoverClassKey>>;
  transitionDuration?: TransitionProps['timeout'] | 'auto';
}

export type MenuClassKey = 'paper';

declare const Menu: React.ComponentType<MenuProps>;

export default Menu;
