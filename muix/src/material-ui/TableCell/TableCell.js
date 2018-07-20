import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { darken, fade, lighten } from '../styles/colorManipulator';
export const styles = theme => ({
  root: {
    display: 'table-cell',
    verticalAlign: 'inherit',
    // Workaround for a rendering bug with spanned columns in Chrome 62.0.
    // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
    borderBottom: `1px solid
    ${theme.palette.type === 'light' ? lighten(fade(theme.palette.divider, 1), 0.88) : darken(fade(theme.palette.divider, 1), 0.8)}`,
    textAlign: 'left',
    padding: '4px 56px 4px 24px',
    '&:last-child': {
      paddingRight: 24
    }
  },
  head: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium
  },
  body: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular
  },
  footer: {
    borderBottom: 0,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12)
  },
  numeric: {
    textAlign: 'right',
    flexDirection: 'row-reverse' // can be dynamically inherited at runtime by contents

  },
  paddingDense: {
    paddingRight: 24
  },
  paddingCheckbox: {
    padding: '0 12px',
    '&:last-child': {
      paddingRight: 12
    }
  },
  paddingNone: {
    padding: 0,
    '&:last-child': {
      padding: 0
    }
  }
});

function TableCell(props, context) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    children,
    classes,
    className: classNameProp,
    component,
    sortDirection,
    numeric,
    padding,
    scope: scopeProp,
    variant,
    ...other
  } = props;
  const {
    table
  } = context;
  let Component;

  if (component) {
    Component = component;
  } else {
    Component = table && table.head ? 'th' : 'td';
  }

  let scope = scopeProp;

  if (!scope && table && table.head) {
    scope = 'col';
  }

  const className = classNames(classes.root, (variant ? variant === 'head' : table && table.head) && classes.head, (variant ? variant === 'body' : table && table.body) && classes.body, (variant ? variant === 'footer' : table && table.footer) && classes.footer, numeric && classes.numeric, padding !== 'default' && classes[`padding${capitalize(padding)}`], classNameProp);
  let ariaSort = null;

  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return <Component className={className} aria-sort={ariaSort} scope={scope} {...other}>
      {children}
    </Component>;
}

TableCell.contextTypes = {
  table: PropTypes.object.isRequired
};
export default withStyles(styles, {
  name: 'MuiTableCell',
  defaultProps: {
    numeric: false,
    padding: 'default'
  }
})(TableCell);