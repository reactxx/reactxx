import { StandardProps } from 'reactxx-muix/typings';
import { ButtonBaseProps } from 'reactxx-muix/typings/ButtonBase/ButtonBase';

export interface TabScrollButtonProps
  extends StandardProps<ButtonBaseProps, TabScrollButtonClassKey> {
  direction?: 'left' | 'right';
  visible?: boolean;
}

export type TabScrollButtonClassKey = 'root';

declare const TabScrollButton: React.ComponentType<TabScrollButtonProps>;

export default TabScrollButton;
