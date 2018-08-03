import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import classNames from 'classnames';
import Collapse from '../Collapse';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    marginTop: 8,
    marginLeft: 12,
    // half icon
    paddingLeft: 8 + 12,
    // margin + half icon
    paddingRight: 8,
    borderLeft: `1px solid ${theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]}`
  },

  /* Styles applied to the root element if `last={true}` (controlled by `Step`). */
  last: {
    borderLeft: 'none'
  },

  /* Styles applied to the Transition component. */
  transition: {}
});

function StepContent(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
    },
    active,
    alternativeLabel,
    children,
    classes,
    className,
    completed,
    last,
    optional,
    orientation,
    TransitionComponent,
    transitionDuration: transitionDurationProp,
    TransitionProps,
    ...other
  } = props;
  warning(orientation === 'vertical', 'Material-UI: <StepContent /> is only designed for use with the vertical stepper.');
  let transitionDuration = transitionDurationProp;

  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  return <div className={classNamesStr(classes.root, last && classes.last, className)} {...other}>
      <TransitionComponent in={active} className={classes.transition} timeout={transitionDuration} unmountOnExit {...TransitionProps}>
        {children}
      </TransitionComponent>
    </div>;
}

const defaultProps = StepContent.defaultProps = {
  TransitionComponent: Collapse,
  transitionDuration: 'auto'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/StepContent/StepContent').Shape>}
*/
export const StepContentCreator = withStyles(styles, StepContent, {
  isMui: true,
  defaultProps
});
const StepContentComponent = StepContentCreator();
if (StepContent.muiName) StepContentComponent.muiName = StepContent.muiName;
export default StepContentComponent;