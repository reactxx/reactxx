// @inheritedComponent ButtonBase
import React from 'react';
import PropTypes from 'prop-types';
import ArrowDownwardIcon from '../internal/svg-icons/ArrowDownward';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalize } from '../utils/helpers';
export const styles = theme => ({
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
  active: {
    color: theme.palette.text.primary,
    '& $icon': {
      opacity: 1
    }
  },
  icon: {
    height: 16,
    marginRight: 4,
    marginLeft: 4,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shorter
    }),
    userSelect: 'none',
    width: 16
  },
  iconDirectionDesc: {
    transform: 'rotate(0deg)'
  },
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
      classNamesStr
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

const defaultProps = {
  active: false,
  direction: 'desc'
};
const meta = {
  component: TableSortLabel || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;