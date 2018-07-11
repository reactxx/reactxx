import * as React from 'react';
import { StandardProps, ModalManager } from 'reactxx-muix/typings';
import { BackdropProps } from 'reactxx-muix/typings/Backdrop';
import { PortalProps } from 'reactxx-muix/typings/Portal';

export interface ModalProps
  extends StandardProps<
      React.HtmlHTMLAttributes<HTMLDivElement> & Partial<PortalProps>,
      ModalClassKey
    > {
  BackdropComponent?: React.ReactType<BackdropProps>;
  BackdropProps?: Partial<BackdropProps>;
  disableAutoFocus?: boolean;
  disableBackdropClick?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disableRestoreFocus?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  manager?: ModalManager;
  onBackdropClick?: React.ReactEventHandler<{}>;
  onClose?: React.ReactEventHandler<{}>;
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  open: boolean;
}

export type ModalClassKey = 'root' | 'hidden';

declare const Modal: React.ComponentType<ModalProps>;

export default Modal;
