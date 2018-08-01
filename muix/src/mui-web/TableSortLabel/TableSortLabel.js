// @inheritedComponent ButtonBase
import React from 'react';
import PropTypes from 'prop-types';
import ArrowDownwardIcon from '../internal/svg-icons/ArrowDownward';
import withStyles from '../styles/withStyles';
import ButtonBase from "../ButtonBase/ButtonBase";
import { capitalize } from '../utils/helpers';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'inherit',
    alignItems: 'center',
    '&:hover': {
      color: theme.palette.text.primary
    },
    '&:focus': {
      color: theme.palette.text.primary
    }
  },

  /* Styles applied to the root element if `active={true}`. */
  active: {
    color: theme.palette.text.primary,
    '& .icon85': {
      opacity: 1
    }
  },

  /* Styles applied to the icon component. */
  icon: {
    height: 16,
    marginRight: 4,
    marginLeft: 4,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shorter
    }),
    userSelect: 'none',
    width: 16,
    NAME$icon85: true
  },

  /* Styles applied to the icon component if `direction="desc"`. */
  iconDirectionDesc: {
    transform: 'rotate(0deg)'
  },

  /* Styles applied to the icon component if `direction="asc"`. */
  iconDirectionAsc: {
    transform: 'rotate(180deg)'
  }
});
/**
 * A button based label for placing inside `TableCell` for column sorting.
 */

function TableSortLabel(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    active,
    classes,
    className,
    children,
    direction,
    ...other
  } = props;
  return <ButtonBase className={classNames(classes.root, active && classes.active, className)} component="span" disableRipple {...other}>
      {children}
      <ArrowDownwardIcon className={classNames(classes.icon, classes[`iconDirection${capitalize(direction)}`])} />
    </ButtonBase>;
}

const defaultProps = TableSortLabel.defaultProps = {
  active: false,
  direction: 'desc'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/TableSortLabel/TableSortLabel').Shape>}
*/
export const TableSortLabelCreator = withStyles(styles, TableSortLabel, {
  isMui: true,
  defaultProps
});
const TableSortLabelComponent = TableSortLabelCreator();
if (TableSortLabel.muiName) TableSortLabelComponent.muiName = TableSortLabel.muiName;
export default TableSortLabelComponent;