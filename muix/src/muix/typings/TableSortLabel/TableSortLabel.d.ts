import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { ButtonBaseProps } from 'reactxx-muix/typings/ButtonBase';

export interface TableSortLabelProps
  extends StandardProps<ButtonBaseProps, TableSortLabelClassKey> {
  active?: boolean;
  direction?: 'asc' | 'desc';
}

export type TableSortLabelClassKey =
  | 'root'
  | 'active'
  | 'icon'
  | 'iconDirectionDesc'
  | 'iconDirectionAsc';

declare const TableSortLabel: React.ComponentType<TableSortLabelProps>;

export default TableSortLabel;
