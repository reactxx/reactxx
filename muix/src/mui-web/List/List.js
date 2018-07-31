import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative'
  },

  /* Styles applied to the root element if `disablePddding={false}`. */
  padding: {
    paddingTop: 8,
    paddingBottom: 8
  },

  /* Styles applied to the root element if `dense={true}` & `disablePddding={false}`. */
  dense: {
    paddingTop: 4,
    paddingBottom: 4
  },

  /* Styles applied to the root element if a `subheader` is provided. */
  subheader: {
    paddingTop: 0
  }
};

class List extends React.Component {
  getChildContext() {
    return {
      dense: this.props.dense
    };
  }

  render() {
    const {
      $system: {
        classNames,
        classNamesStr,
        theme
      },
      children,
      classes,
      className: classNameProp,
      component: Component,
      dense,
      disablePadding,
      subheader,
      ...other
    } = this.props;
    const className = classNames(classes.root, dense && !disablePadding && classes.dense, !disablePadding && classes.padding, subheader && classes.subheader, classNameProp);
    return <Component className={classNamesStr(className)} {...other}>
        {subheader}
        {children}
      </Component>;
  }

}

List.childContextTypes = {
  dense: PropTypes.bool
};
const defaultProps = List.defaultProps = {
  component: 'ul',
  dense: false,
  disablePadding: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/List/List').Shape>}
*/
export const ListCreator = withStyles(styles, List, {
  isMui: true,
  defaultProps
});
const ListComponent = ListCreator();
ListComponent.muiName = List.muiName;
export default ListComponent;