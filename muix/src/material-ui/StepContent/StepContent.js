import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Collapse from '../Collapse';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    marginTop: 8,
    marginLeft: 12,
    // half icon
    paddingLeft: 8 + 12,
    // margin + half icon
    paddingRight: 8,
    borderLeft: `1px solid ${theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]}`
  },
  last: {
    borderLeft: 'none'
  },
  transition: {}
});

function StepContent(props) {
  const {
    $system: {
      classNames,
      classNamesStr
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

const defaultProps = {
  TransitionComponent: Collapse,
  transitionDuration: 'auto'
};
const meta = {
  component: StepContent || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;