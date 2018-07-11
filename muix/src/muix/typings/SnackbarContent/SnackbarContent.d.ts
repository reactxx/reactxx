import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { PaperProps } from 'reactxx-muix/typings/Paper';

export interface SnackbarContentProps extends StandardProps<PaperProps, SnackbarContentClassKey> {
  action?: React.ReactElement<any>;
  message: React.ReactElement<any> | string;
}

export type SnackbarContentClassKey = 'root' | 'message' | 'action';

declare const SnackbarContent: React.ComponentType<SnackbarContentProps>;

export default SnackbarContent;
