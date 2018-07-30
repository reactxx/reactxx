import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: 'inherit',
    display: 'table-row',
    height: 48,
    verticalAlign: 'middle',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none',
    '&.selected84': {
      backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.04)' // grey[100]
      : 'rgba(255, 255, 255, 0.08)'
    },
    '&.hover84:hover': {
      backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.07)' // grey[200]
      : 'rgba(255, 255, 255, 0.14)'
    }
  },

  /* Styles applied to the root element if `context.table` & `selected={true}`. */
  selected: {
    NAME$selected84: true
  },

  /* Styles applied to the root element if `context.table` & `hover={true}`. */
  hover: {
    NAME$hover84: true
  },

  /* Styles applied to the root element if `context.table.head`. */
  head: {
    height: 56
  },

  /* Styles applied to the root element if `context.table.footer`. */
  footer: {
    height: 56
  }
});
/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */

function TableRow(props, context) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    classes,
    className: classNameProp,
    component: Component,
    hover,
    selected,
    ...other
  } = props;
  const {
    table
  } = context;
  const className = classNames(classes.root, table && table.head && classes.head, table && table.footer && classes.footer, table && hover && classes.hover, table && selected && classes.selected, classNameProp);
  return <Component className={classNamesStr(className)} {...other} />;
}

TableRow.contextTypes = {
  table: PropTypes.object
};
const defaultProps = TableRow.defaultProps = {
  component: 'tr',
  hover: false,
  selected: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/TableRow/TableRow').Shape>}
*/
export const TableRowCreator = withStyles(styles, TableRow, {
  isMui: true,
  defaultProps
});
const TableRowComponent = TableRowCreator();
export default TableRowComponent;