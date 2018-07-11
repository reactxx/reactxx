import * as React from 'react';
import { StandardProps } from 'reactxx-muix/typings';
import { CollapseProps } from 'reactxx-muix/typings/Collapse';
import { PaperProps } from 'reactxx-muix/typings/Paper';

export interface ExpansionPanelProps
  extends StandardProps<PaperProps, ExpansionPanelClassKey, 'onChange'> {
  CollapseProps?: Partial<CollapseProps>;
  defaultExpanded?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  onChange?: (event: React.ChangeEvent<{}>, expanded: boolean) => void;
}

export type ExpansionPanelClassKey = 'root' | 'expanded' | 'disabled';

declare const ExpansionPanel: React.ComponentType<ExpansionPanelProps>;

export default ExpansionPanel;
