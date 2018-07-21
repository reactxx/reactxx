import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none'
  },
  colorDefault: {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
  },
  img: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    // Handle non-square image. The property isn't supported by IE11.
    objectFit: 'cover'
  }
});

function Avatar(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    alt,
    children: childrenProp,
    childrenClassName: childrenClassNameProp,
    classes,
    className: classNameProp,
    component: Component,
    imgProps,
    sizes,
    src,
    srcSet,
    ...other
  } = props;
  const className = classNames(classes.root, childrenProp && !src && !srcSet && classes.colorDefault, classNameProp);
  let children = null;

  if (childrenProp) {
    if (childrenClassNameProp && typeof childrenProp !== 'string' && React.isValidElement(childrenProp)) {
      const childrenClassName = classNames(childrenClassNameProp, childrenProp.props.className);
      children = React.cloneElement(childrenProp, {
        className: childrenClassName
      });
    } else {
      children = childrenProp;
    }
  } else if (src || srcSet) {
    children = <img alt={alt} src={src} srcSet={srcSet} sizes={sizes} className={classNamesStr(classes.img)} {...imgProps} />;
  }

  return <Component className={className} {...other}>
      {children}
    </Component>;
}

const defaultProps = {
  component: 'div'
};
const meta = {
  component: Avatar || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;