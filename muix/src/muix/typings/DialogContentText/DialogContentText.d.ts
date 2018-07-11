import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';

export interface DialogContentTextProps
  extends StandardProps<React.HTMLAttributes<HTMLParagraphElement>, DialogContentTextClassKey> {}

export type DialogContentTextClassKey = 'root';

declare const DialogContentText: React.ComponentType<DialogContentTextProps>;

export default DialogContentText;
