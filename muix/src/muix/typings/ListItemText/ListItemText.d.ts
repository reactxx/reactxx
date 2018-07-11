import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { TypographyProps } from 'reactxx-muix/typings/Typography';

export interface ListItemTextProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemTextClassKey> {
  disableTypography?: boolean;
  inset?: boolean;
  primary?: React.ReactNode;
  primaryTypographyProps?: Partial<TypographyProps>;
  secondary?: React.ReactNode;
  secondaryTypographyProps?: Partial<TypographyProps>;
}

export type ListItemTextClassKey =
  | 'root'
  | 'inset'
  | 'dense'
  | 'primary'
  | 'secondary'
  | 'textDense';

declare const ListItemText: React.ComponentType<ListItemTextProps>;

export default ListItemText;
