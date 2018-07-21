// @inheritedComponent Paper
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import Typography from '../Typography';
import { emphasize } from '../styles/colorManipulator';
export const styles = theme => {
  const emphasis = theme.palette.type === 'light' ? 0.8 : 0.98;
  const backgroundColor = emphasize(theme.palette.background.default, emphasis);
  return {
    root: {
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '6px 24px',
      [theme.breakpoints.up('md')]: {
        minWidth: 288,
        maxWidth: 568,
        borderRadius: theme.shape.borderRadius
      },
      [theme.breakpoints.down('sm')]: {
        flexGrow: 1
      }
    },
    message: {
      padding: '8px 0'
    },
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: 24,
      marginRight: -8
    }
  };
};

function SnackbarContent(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    action,
    classes,
    className,
    message,
    ...other
  } = props;
  return <Paper component={Typography} headlineMapping={{
    body1: 'div'
  }} role="alertdialog" square elevation={6} className={classNames(classes.root, className)} {...other}>
      <div className={classNamesStr(classes.message)}>{message}</div>
      {action ? <div className={classNamesStr(classes.action)}>{action}</div> : null}
    </Paper>;
}

const meta = {
  component: SnackbarContent || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;