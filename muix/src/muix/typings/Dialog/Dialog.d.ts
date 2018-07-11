import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { PaperProps } from 'reactxx-muix/typings/Paper';
import { ModalProps } from 'reactxx-muix/typings/Modal';
import { TransitionHandlerProps, TransitionProps } from 'reactxx-muix/typings/transitions/transition';

export interface DialogProps
  extends StandardProps<ModalProps & Partial<TransitionHandlerProps>, DialogClassKey, 'children'> {
  children?: React.ReactNode;
  fullScreen?: boolean;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | false;
  PaperProps?: Partial<PaperProps>;
  scroll?: 'body' | 'paper';
  TransitionComponent?: React.ReactType;
  transitionDuration?: TransitionProps['timeout'];
  TransitionProps?: TransitionProps;
}

export type DialogClassKey =
  | 'root'
  | 'scrollPaper'
  | 'scrollBody'
  | 'paper'
  | 'paperScrollPaper'
  | 'paperScrollBody'
  | 'paperWidthXs'
  | 'paperWidthSm'
  | 'paperWidthMd'
  | 'paperFullWidth'
  | 'paperFullScreen';

declare const Dialog: React.ComponentType<DialogProps>;

export default Dialog;
