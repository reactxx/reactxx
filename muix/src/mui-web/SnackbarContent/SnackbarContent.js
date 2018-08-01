// @inheritedComponent Paper
import React from 'react';
import { toAtomic } from '../styles/withStyles';

import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Paper from "../Paper/Paper";
import Typography from "../Typography/Typography";
import { emphasize } from '../styles/colorManipulator';
export const styles = theme => {
  const emphasis = theme.palette.type === 'light' ? 0.8 : 0.98;
  const backgroundColor = emphasize(theme.palette.background.default, emphasis);
  return {
    /* Styles applied to the root element. */
    root: { ...toAtomic('padding', '6px 24px'),
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      [theme.breakpoints.up('md')]: {
        minWidth: 288,
        maxWidth: 568,
        borderRadius: theme.shape.borderRadius
      },
      [theme.breakpoints.down('sm')]: {
        flexGrow: 1
      }
    },

    /* Styles applied to the message wrapper element. */
    message: { ...toAtomic('padding', '8px 0')
    },

    /* Styles applied to the action wrapper element if `action` is provided. */
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
      classNamesStr,
      theme
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

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/SnackbarContent/SnackbarContent').Shape>}
*/
export const SnackbarContentCreator = withStyles(styles, SnackbarContent, {
  isMui: true,
  defaultProps
});
const SnackbarContentComponent = SnackbarContentCreator();
if (SnackbarContent.muiName) SnackbarContentComponent.muiName = SnackbarContent.muiName;
export default SnackbarContentComponent;