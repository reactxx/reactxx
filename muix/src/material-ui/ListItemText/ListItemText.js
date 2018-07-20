import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
export const styles = theme => ({
  root: {
    flex: '1 1 auto',
    minWidth: 0,
    padding: '0 16px',
    '&:first-child': {
      paddingLeft: 0
    }
  },
  inset: {
    '&:first-child': {
      paddingLeft: 56
    }
  },
  dense: {
    fontSize: theme.typography.pxToRem(13)
  },
  primary: {
    '&$textDense': {
      fontSize: 'inherit'
    }
  },
  secondary: {
    '&$textDense': {
      fontSize: 'inherit'
    }
  },
  textDense: {}
});

function ListItemText(props, context) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    children,
    classes,
    className: classNameProp,
    disableTypography,
    inset,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps,
    ...other
  } = props;
  const {
    dense
  } = context;
  let primary = primaryProp != null ? primaryProp : children;

  if (primary != null && primary.type !== Typography && !disableTypography) {
    primary = <Typography variant="subheading" className={classNames(classes.primary, dense && classes.textDense)} component="span" {...primaryTypographyProps}>
        {primary}
      </Typography>;
  }

  let secondary = secondaryProp;

  if (secondary != null && secondary.type !== Typography && !disableTypography) {
    secondary = <Typography variant="body1" className={classNames(classes.secondary, dense && classes.textDense)} color="textSecondary" {...secondaryTypographyProps}>
        {secondary}
      </Typography>;
  }

  return <div className={classNamesStr(classes.root, dense && classes.dense, inset && classes.inset, classNameProp)} {...other}>
      {primary}
      {secondary}
    </div>;
}

ListItemText.contextTypes = {
  dense: PropTypes.bool
};
export default withStyles(styles, {
  name: 'MuiListItemText',
  defaultProps: {
    disableTypography: false,
    inset: false
  }
})(ListItemText);