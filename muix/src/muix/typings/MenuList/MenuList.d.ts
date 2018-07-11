import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { ListProps, ListClassKey } from 'reactxx-muix/typings/List';

export interface MenuListProps extends StandardProps<ListProps, MenuListClassKey, 'onKeyDown'> {
  onKeyDown?: React.ReactEventHandler<React.KeyboardEvent<any>>;
}

export type MenuListClassKey = ListClassKey;

declare const MenuList: React.ComponentType<MenuListProps>;

export default MenuList;
