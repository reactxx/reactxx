import * as React from 'react';
import { StyledComponentProps } from 'reactxx-muix/typings/styles';
export { StyledComponentProps };

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 */
export type StandardProps<C, ClassKey extends string, Removals extends keyof C = never> = Omit<
  C,
  'classes' | Removals
> &
  StyledComponentProps<ClassKey> & {
    className?: string;
    style?: React.CSSProperties;
  };

export type PaletteType = 'light' | 'dark';
export interface Color {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

/**
 * Remove properties `K` from `T`.
 *
 * @internal
 */
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * `T extends ConsistentWith<T, U>` means that where `T` has overlapping properties with
 * `U`, their value types do not conflict.
 *
 * @internal
 */
export type ConsistentWith<T, U> = Pick<U, keyof T & keyof U>;

/**
 * Like `T & U`, but using the value types from `U` where their properties overlap.
 *
 * @internal
 */
export type Overwrite<T, U> = (U extends ConsistentWith<U, T> ? T : Omit<T, keyof U>) & U;

export namespace PropTypes {
  type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
  type Color = 'inherit' | 'primary' | 'secondary' | 'default';
  type Margin = 'none' | 'dense' | 'normal';
}

// From index.js
import * as colors from 'reactxx-muix/typings/colors';

export { colors };
export {
  createGenerateClassName,
  createMuiTheme,
  jssPreset,
  MuiThemeProvider,
  StyleRulesCallback,
  Theme,
  withStyles,
  WithStyles,
  createStyles,
  withTheme,
  WithTheme,
} from 'reactxx-muix/typings/styles';

export { default as AppBar } from 'reactxx-muix/typings/AppBar';
export { default as Avatar } from 'reactxx-muix/typings/Avatar';
export { default as Backdrop } from 'reactxx-muix/typings/Backdrop';
export { default as Badge } from 'reactxx-muix/typings/Badge';
export { default as BottomNavigation } from 'reactxx-muix/typings/BottomNavigation';
export { default as BottomNavigationAction } from 'reactxx-muix/typings/BottomNavigationAction';
export { default as Button } from 'reactxx-muix/typings/Button';
export { default as ButtonBase } from 'reactxx-muix/typings/ButtonBase';
export { default as Card } from 'reactxx-muix/typings/Card';
export { default as CardActions } from 'reactxx-muix/typings/CardActions';
export { default as CardContent } from 'reactxx-muix/typings/CardContent';
export { default as CardHeader } from 'reactxx-muix/typings/CardHeader';
export { default as CardMedia } from 'reactxx-muix/typings/CardMedia';
export { default as Checkbox } from 'reactxx-muix/typings/Checkbox';
export { default as Chip } from 'reactxx-muix/typings/Chip';
export { default as CircularProgress } from 'reactxx-muix/typings/CircularProgress';
export { default as ClickAwayListener } from 'reactxx-muix/typings/ClickAwayListener';
export { default as Collapse } from 'reactxx-muix/typings/Collapse';
export { default as CssBaseline } from 'reactxx-muix/typings/CssBaseline';
export { default as Dialog } from 'reactxx-muix/typings/Dialog';
export { default as DialogActions } from 'reactxx-muix/typings/DialogActions';
export { default as DialogContent } from 'reactxx-muix/typings/DialogContent';
export { default as DialogContentText } from 'reactxx-muix/typings/DialogContentText';
export { default as DialogTitle } from 'reactxx-muix/typings/DialogTitle';
export { default as Divider } from 'reactxx-muix/typings/Divider';
export { default as Drawer } from 'reactxx-muix/typings/Drawer';
export { default as ExpansionPanel } from 'reactxx-muix/typings/ExpansionPanel';
export { default as ExpansionPanelActions } from 'reactxx-muix/typings/ExpansionPanelActions';
export { default as ExpansionPanelDetails } from 'reactxx-muix/typings/ExpansionPanelDetails';
export { default as ExpansionPanelSummary } from 'reactxx-muix/typings/ExpansionPanelSummary';
export { default as Fade } from 'reactxx-muix/typings/Fade';
export { default as FormControl } from 'reactxx-muix/typings/FormControl';
export { default as FormControlLabel } from 'reactxx-muix/typings/FormControlLabel';
export { default as FormGroup } from 'reactxx-muix/typings/FormGroup';
export { default as FormHelperText } from 'reactxx-muix/typings/FormHelperText';
export { default as FormLabel } from 'reactxx-muix/typings/FormLabel';
export { default as Grid } from 'reactxx-muix/typings/Grid';
export { default as GridList } from 'reactxx-muix/typings/GridList';
export { default as GridListTile } from 'reactxx-muix/typings/GridListTile';
export { default as GridListTileBar } from 'reactxx-muix/typings/GridListTileBar';
export { default as Grow } from 'reactxx-muix/typings/Grow';
export { default as Hidden } from 'reactxx-muix/typings/Hidden';
export { default as Icon } from 'reactxx-muix/typings/Icon';
export { default as IconButton } from 'reactxx-muix/typings/IconButton';
export { default as Input } from 'reactxx-muix/typings/Input';
export { default as InputAdornment } from 'reactxx-muix/typings/InputAdornment';
export { default as InputLabel } from 'reactxx-muix/typings/InputLabel';
export { default as LinearProgress } from 'reactxx-muix/typings/LinearProgress';
export { default as List } from 'reactxx-muix/typings/List';
export { default as ListItem } from 'reactxx-muix/typings/ListItem';
export { default as ListItemAvatar } from 'reactxx-muix/typings/ListItemAvatar';
export { default as ListItemIcon } from 'reactxx-muix/typings/ListItemIcon';
export { default as ListItemSecondaryAction } from 'reactxx-muix/typings/ListItemSecondaryAction';
export { default as ListItemText } from 'reactxx-muix/typings/ListItemText';
export { default as ListSubheader } from 'reactxx-muix/typings/ListSubheader';
export { default as Menu } from 'reactxx-muix/typings/Menu';
export { default as MenuItem } from 'reactxx-muix/typings/MenuItem';
export { default as MenuList } from 'reactxx-muix/typings/MenuList';
export { default as MobileStepper } from 'reactxx-muix/typings/MobileStepper';
export { default as Modal, ModalManager } from 'reactxx-muix/typings/Modal';
export { default as NativeSelect } from 'reactxx-muix/typings/NativeSelect';
export { default as Paper } from 'reactxx-muix/typings/Paper';
export { default as Popover } from 'reactxx-muix/typings/Popover';
export { default as Portal } from 'reactxx-muix/typings/Portal';
export { default as Radio } from 'reactxx-muix/typings/Radio';
export { default as RadioGroup } from 'reactxx-muix/typings/RadioGroup';
export { default as RootRef } from 'reactxx-muix/typings/RootRef';
export { default as Select } from 'reactxx-muix/typings/Select';
export { default as Slide } from 'reactxx-muix/typings/Slide';
export { default as Snackbar } from 'reactxx-muix/typings/Snackbar';
export { default as SnackbarContent } from 'reactxx-muix/typings/SnackbarContent';
export { default as Step } from 'reactxx-muix/typings/Step';
export { default as StepButton } from 'reactxx-muix/typings/StepButton';
export { default as StepConnector } from 'reactxx-muix/typings/StepConnector';
export { default as StepContent } from 'reactxx-muix/typings/StepContent';
export { default as StepIcon } from 'reactxx-muix/typings/StepIcon';
export { default as StepLabel } from 'reactxx-muix/typings/StepLabel';
export { default as Stepper } from 'reactxx-muix/typings/Stepper';
export { default as SvgIcon } from 'reactxx-muix/typings/SvgIcon';
export { default as SwipeableDrawer } from 'reactxx-muix/typings/SwipeableDrawer';
export { default as Switch } from 'reactxx-muix/typings/Switch';
export { default as Table } from 'reactxx-muix/typings/Table';
export { default as TableBody } from 'reactxx-muix/typings/TableBody';
export { default as TableCell } from 'reactxx-muix/typings/TableCell';
export { default as TableFooter } from 'reactxx-muix/typings/TableFooter';
export { default as TableHead } from 'reactxx-muix/typings/TableHead';
export { default as TablePagination } from 'reactxx-muix/typings/TablePagination';
export { default as TableRow } from 'reactxx-muix/typings/TableRow';
export { default as TableSortLabel } from 'reactxx-muix/typings/TableSortLabel';
export { default as Tabs } from 'reactxx-muix/typings/Tabs';
export { default as Tab } from 'reactxx-muix/typings/Tab';
export { default as TextField } from 'reactxx-muix/typings/TextField';
export { default as Toolbar } from 'reactxx-muix/typings/Toolbar';
export { default as Tooltip } from 'reactxx-muix/typings/Tooltip';
export { default as Typography } from 'reactxx-muix/typings/Typography';
export { default as withMobileDialog } from 'reactxx-muix/typings/withMobileDialog';
export { default as withWidth } from 'reactxx-muix/typings/withWidth';
export { default as Zoom } from 'reactxx-muix/typings/Zoom';
