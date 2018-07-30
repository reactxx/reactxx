import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
  root: {
    position: 'absolute',
    right: 4,
    top: '50%',
    transform: 'translateY(-50%)'
  }
};

function ListItemSecondaryAction(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    children,
    classes,
    className,
    ...other
  } = props;
  return <div className={classNamesStr(classes.root, className)} {...other}>
      {children}
    </div>;
}

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/ListItemSecondaryAction/ListItemSecondaryAction').Shape>}
*/
export const ListItemSecondaryActionCreator = withStyles(styles, ListItemSecondaryAction, {
  isMui: true,
  defaultProps
});
const ListItemSecondaryActionComponent = ListItemSecondaryActionCreator();
export default ListItemSecondaryActionComponent;