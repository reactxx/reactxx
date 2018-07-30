import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { darken, fade, lighten } from '../styles/colorManipulator';
export const styles = theme => ({
  /* Styles applied to the root element. */
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

  /* Styles applied to the root element if `variant="head"` or `context.table.head`. */
  head: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium
  },

  /* Styles applied to the root element if `variant="body"` or `context.table.body`. */
  body: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular
  },

  /* Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
  footer: {
    borderBottom: 0,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(12)
  },

  /* Styles applied to the root element if `numeric={true}`. */
  numeric: {
    textAlign: 'right',
    flexDirection: 'row-reverse' // can be dynamically inherited at runtime by contents

  },

  /* Styles applied to the root element if `padding="dense"`. */
  paddingDense: {
    paddingRight: 24
  },

  /* Styles applied to the root element if `padding="checkbox"`. */
  paddingCheckbox: {
    padding: '0 12px',
    '&:last-child': {
      paddingRight: 12
    }
  },

  /* Styles applied to the root element if `padding="none"`. */
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
      classNamesStr,
      theme
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

  return <Component className={classNamesStr(className)} aria-sort={ariaSort} scope={scope} {...other}>
      {children}
    </Component>;
}

TableCell.contextTypes = {
  table: PropTypes.object.isRequired
};
const defaultProps = TableCell.defaultProps = {
  numeric: false,
  padding: 'default'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/TableCell/TableCell').Shape>}
*/
export const TableCellCreator = withStyles(styles, TableCell, {
  isMui: true,
  defaultProps
});
const TableCellComponent = TableCellCreator();
export default TableCellComponent;