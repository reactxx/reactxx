import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    color: 'inherit',
    display: 'table-row',
    height: 48,
    verticalAlign: 'middle',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none',
    '&$selected': {
      backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.04)' // grey[100]
      : 'rgba(255, 255, 255, 0.08)'
    },
    '&$hover:hover': {
      backgroundColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.07)' // grey[200]
      : 'rgba(255, 255, 255, 0.14)'
    }
  },
  selected: {},
  hover: {},
  head: {
    height: 56
  },
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
      classNamesStr
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
  return <Component className={className} {...other} />;
}

TableRow.contextTypes = {
  table: PropTypes.object
};
const defaultProps = {
  component: 'tr',
  hover: false,
  selected: false
};
const meta = {
  component: TableRow || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;