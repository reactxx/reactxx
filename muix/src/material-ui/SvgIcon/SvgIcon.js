import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
export const styles = theme => ({
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
  colorPrimary: {
    color: theme.palette.primary.main
  },
  colorSecondary: {
    color: theme.palette.secondary.main
  },
  colorAction: {
    color: theme.palette.action.active
  },
  colorError: {
    color: theme.palette.error.main
  },
  colorDisabled: {
    color: theme.palette.action.disabled
  },
  fontSizeInherit: {
    fontSize: 'inherit'
  }
});

function SvgIcon(props) {
  const {
    $system: {
      classNames,
      classNamesStr
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
  const className = classNames(classes.root, fontSize !== 'default' && classes[`fontSize${capitalize(fontSize)}`], color !== 'inherit' && classes[`color${capitalize(color)}`], classNameProp);
  return <Component className={className} focusable="false" viewBox={viewBox} color={nativeColor} aria-hidden={titleAccess ? 'false' : 'true'} {...other}>
      {children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </Component>;
}

SvgIcon.muiName = 'SvgIcon';
const defaultProps = {
  color: 'inherit',
  component: 'svg',
  fontSize: 'default',
  viewBox: '0 0 24 24'
};
const meta = {
  component: SvgIcon || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;