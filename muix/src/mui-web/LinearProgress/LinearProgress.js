import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import withStyles from '../styles/withStyles';
import { lighten } from '../styles/colorManipulator';
const TRANSITION_DURATION = 4; // seconds

export const styles = theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    height: 5
  },
  colorPrimary: {
    backgroundColor: lighten(theme.palette.primary.light, 0.6)
  },
  colorSecondary: {
    backgroundColor: lighten(theme.palette.secondary.light, 0.4)
  },
  buffer: {
    backgroundColor: 'transparent'
  },
  query: {
    transform: 'rotate(180deg)'
  },
  dashed: {
    position: 'absolute',
    marginTop: 0,
    height: '100%',
    width: '100%',
    animation: 'buffer 3s infinite linear'
  },
  dashedColorPrimary: {
    backgroundImage: `radial-gradient(${lighten(theme.palette.primary.light, 0.6)} 0%, ${lighten(theme.palette.primary.light, 0.6)} 16%, transparent 42%)`,
    backgroundSize: '10px 10px',
    backgroundPosition: '0px -23px'
  },
  dashedColorSecondary: {
    backgroundImage: `radial-gradient(${lighten(theme.palette.secondary.light, 0.4)} 0%, ${lighten(theme.palette.secondary.light, 0.6)} 16%, transparent 42%)`,
    backgroundSize: '10px 10px',
    backgroundPosition: '0px -23px'
  },
  bar: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    transition: 'transform 0.2s linear',
    transformOrigin: 'left'
  },
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main
  },
  barColorSecondary: {
    backgroundColor: theme.palette.secondary.main
  },
  bar1Indeterminate: {
    width: 'auto',
    willChange: 'left, right',
    animation: 'mui-indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite'
  },
  bar2Indeterminate: {
    width: 'auto',
    willChange: 'left, right',
    animation: 'mui-indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
    animationDelay: '1.15s'
  },
  bar1Determinate: {
    willChange: 'transform',
    transition: `transform .${TRANSITION_DURATION}s linear`
  },
  bar1Buffer: {
    zIndex: 1,
    transition: `transform .${TRANSITION_DURATION}s linear`
  },
  bar2Buffer: {
    transition: `transform .${TRANSITION_DURATION}s linear`
  },
  // Legends:
  // || represents the viewport
  // -  represents a light background
  // x  represents a dark background
  '@keyframes mui-indeterminate1': {
    //  |-----|---x-||-----||-----|
    '0%': {
      left: '-35%',
      right: '100%'
    },
    //  |-----|-----||-----||xxxx-|
    '60%': {
      left: '100%',
      right: '-90%'
    },
    '100%': {
      left: '100%',
      right: '-90%'
    }
  },
  '@keyframes mui-indeterminate2': {
    //  |xxxxx|xxxxx||-----||-----|
    '0%': {
      left: '-200%',
      right: '100%'
    },
    //  |-----|-----||-----||-x----|
    '60%': {
      left: '107%',
      right: '-8%'
    },
    '100%': {
      left: '107%',
      right: '-8%'
    }
  },
  '@keyframes buffer': {
    '0%': {
      opacity: 1,
      backgroundPosition: '0px -23px'
    },
    '50%': {
      opacity: 0,
      backgroundPosition: '0px -23px'
    },
    '100%': {
      opacity: 1,
      backgroundPosition: '-200px -23px'
    }
  }
});
/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */

function LinearProgress(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    classes,
    className: classNameProp,
    color,
    value,
    valueBuffer,
    variant,
    ...other
  } = props;
  const className = classNames(classes.root, color === 'primary' && classes.colorPrimary, color === 'secondary' && classes.colorSecondary, variant === 'buffer' && classes.buffer, variant === 'query' && classes.query, classNameProp);
  const dashedClass = classNames(classes.dashed, color === 'primary' && classes.dashedColorPrimary, color === 'secondary' && classes.dashedColorSecondary);
  const bar1ClassName = classNames(classes.bar, color === 'primary' && classes.barColorPrimary, color === 'secondary' && classes.barColorSecondary, (variant === 'indeterminate' || variant === 'query') && classes.bar1Indeterminate, variant === 'determinate' && classes.bar1Determinate, variant === 'buffer' && classes.bar1Buffer);
  const bar2ClassName = classNames(classes.bar, color === 'primary' && variant !== 'buffer' && classes.barColorPrimary, color === 'primary' && variant === 'buffer' && classes.colorPrimary, color === 'secondary' && variant !== 'buffer' && classes.barColorSecondary, color === 'secondary' && variant === 'buffer' && classes.colorSecondary, (variant === 'indeterminate' || variant === 'query') && classes.bar2Indeterminate, variant === 'buffer' && classes.bar2Buffer);
  const rootProps = {};
  const inlineStyles = {
    bar1: {},
    bar2: {}
  };

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      rootProps['aria-valuenow'] = Math.round(value);
      inlineStyles.bar1.transform = `scaleX(${value / 100})`;
    } else {
      warning(false, 'Material-UI: you need to provide a value property ' + 'when using the determinate or buffer variant of LinearProgress .');
    }
  }

  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      inlineStyles.bar2.transform = `scaleX(${(valueBuffer || 0) / 100})`;
    } else {
      warning(false, 'Material-UI: you need to provide a valueBuffer property ' + 'when using the buffer variant of LinearProgress.');
    }
  }

  return <div className={classNamesStr(className)} role="progressbar" {...rootProps} {...other}>
      {variant === 'buffer' ? <div className={classNamesStr(dashedClass)} /> : null}
      <div className={classNamesStr(bar1ClassName)} style={inlineStyles.bar1} />
      {variant === 'determinate' ? null : <div className={classNamesStr(bar2ClassName)} style={inlineStyles.bar2} />}
    </div>;
}

const defaultProps = {
  color: 'primary',
  variant: 'indeterminate'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/LinearProgress/LinearProgress').Shape>}
*/
export const LinearProgressCreator = withStyles(styles, LinearProgress, {
  isMui: true,
  defaultProps
});
const LinearProgressComponent = LinearProgressCreator();
export default LinearProgressComponent;