import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { ButtonBaseProps } from 'reactxx-muix/typings/ButtonBase';

export interface ExpansionPanelSummaryProps
  extends StandardProps<ButtonBaseProps, ExpansionPanelSummaryClassKey> {
  disabled?: boolean;
  expanded?: boolean;
  expandIcon?: React.ReactNode;
  onChange?: React.ReactEventHandler<{}>;
}

export type ExpansionPanelSummaryClassKey =
  | 'root'
  | 'expanded'
  | 'focused'
  | 'disabled'
  | 'content'
  | 'expandIcon';

declare const ExpansionPanelSummary: React.ComponentType<ExpansionPanelSummaryProps>;

export default ExpansionPanelSummary;
