import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
    fontSize: 24,
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter
    })
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main
  },

  /* Styles applied to the root element if `color="saction"`. */
  colorAction: {
    color: theme.palette.action.active
  },

  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    color: theme.palette.error.main
  },

  /* Styles applied to the root element if `color="disabled"`. */
  colorDisabled: {
    color: theme.palette.action.disabled
  },

  /* Styles applied to the root element if `fontSize="inherit"`. */
  fontSizeInherit: {
    fontSize: 'inherit'
  }
});

function SvgIcon(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
    },
    children,
    classes,
    className: classNameProp,
    color,
    component: Component,
    fontSize,
    nativeColor,
    titleAccess,
    viewBox,
    ...other
  } = props;
  const className = classNames(classes.root, fontSize === 'inherit' && classes.fontSizeInherit, color !== 'inherit' && classes[`color${capitalize(color)}`], classNameProp);
  return <Component className={classNamesAny(Component, className)} focusable="false" viewBox={viewBox} color={nativeColor} aria-hidden={titleAccess ? 'false' : 'true'} {...other}>
      {children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </Component>;
}

SvgIcon.muiName = 'SvgIcon';
const defaultProps = SvgIcon.defaultProps = {
  color: 'inherit',
  component: 'svg',
  fontSize: 'default',
  viewBox: '0 0 24 24'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/SvgIcon/SvgIcon').Shape>}
*/
export const SvgIconCreator = withStyles(styles, SvgIcon, {
  isMui: true,
  defaultProps
});
const SvgIconComponent = SvgIconCreator();
if (SvgIcon.muiName) SvgIconComponent.muiName = SvgIcon.muiName;
export default SvgIconComponent;