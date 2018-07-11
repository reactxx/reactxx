import { PropTypes, StandardProps } from 'reactxx-muix/typings';
import { PaperProps } from 'reactxx-muix/typings/Paper';

export interface AppBarProps extends StandardProps<PaperProps, AppBarClassKey> {
  color?: PropTypes.Color;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static';
}

export type AppBarClassKey =
  | 'root'
  | 'positionFixed'
  | 'positionAbsolute'
  | 'positionSticky'
  | 'positionStatic'
  | 'colorDefault'
  | 'colorPrimary'
  | 'colorSecondary';

declare const AppBar: React.ComponentType<AppBarProps>;

export default AppBar;
