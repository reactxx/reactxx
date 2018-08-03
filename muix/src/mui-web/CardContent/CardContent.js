import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    '&:last-child': {
      paddingBottom: 24
    }
  })
});

function CardContent(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
    },
    classes,
    className,
    component: Component,
    ...other
  } = props;
  return <Component className={classNamesAny(Component, classes.root, className)} {...other} />;
}

const defaultProps = CardContent.defaultProps = {
  component: 'div'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/CardContent/CardContent').Shape>}
*/
export const CardContentCreator = withStyles(styles, CardContent, {
  isMui: true,
  defaultProps
});
const CardContentComponent = CardContentCreator();
if (CardContent.muiName) CardContentComponent.muiName = CardContent.muiName;
export default CardContentComponent;