import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { ListItemProps } from 'reactxx-muix/typings/ListItem';

export interface MenuItemProps extends StandardProps<ListItemProps, MenuItemClassKey> {
  component?: React.ReactType<MenuItemProps>;
  role?: string;
  selected?: boolean;
}

export type MenuItemClassKey = 'root' | 'selected';

declare const MenuItem: React.ComponentType<MenuItemProps>;

export default MenuItem;
