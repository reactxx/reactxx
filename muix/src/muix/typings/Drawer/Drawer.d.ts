import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { ModalProps } from 'reactxx-muix/typings/Modal';
import { SlideProps } from 'reactxx-muix/typings/Slide';
import { PaperProps } from 'reactxx-muix/typings/Paper';
import { Theme } from 'reactxx-muix/typings/styles/createMuiTheme';
import { TransitionHandlerProps, TransitionProps } from 'reactxx-muix/typings/transitions/transition';

export interface DrawerProps
  extends StandardProps<
      ModalProps & Partial<TransitionHandlerProps>,
      DrawerClassKey,
      'open' | 'children'
    > {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  children?: React.ReactNode;
  elevation?: number;
  ModalProps?: Partial<ModalProps>;
  open?: boolean;
  PaperProps?: Partial<PaperProps>;
  SlideProps?: Partial<SlideProps>;
  theme?: Theme;
  transitionDuration?: TransitionProps['timeout'];
  variant?: 'permanent' | 'persistent' | 'temporary';
}

export type DrawerClassKey =
  | 'docked'
  | 'paper'
  | 'paperAnchorLeft'
  | 'paperAnchorRight'
  | 'paperAnchorTop'
  | 'paperAnchorBottom'
  | 'paperAnchorDockedLeft'
  | 'paperAnchorDockedTop'
  | 'paperAnchorDockedRight'
  | 'paperAnchorDockedBottom'
  | 'modal';

declare const Drawer: React.ComponentType<DrawerProps>;

export default Drawer;
