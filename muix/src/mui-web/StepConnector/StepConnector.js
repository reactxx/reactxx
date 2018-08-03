import React from 'react';
import { toAtomic } from '../styles/withStyles';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto'
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: { ...toAtomic('padding', '0 0 8px'),
    marginLeft: 12
  },

  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    position: 'absolute',
    top: 8 + 4,
    left: 'calc(50% + 20px)',
    right: 'calc(-50% + 20px)'
  },

  /* Styles applied to the line element. */
  line: {
    display: 'block',
    borderColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  lineHorizontal: {
    borderTopStyle: 'solid',
    borderTopWidth: 1
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  lineVertical: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24
  }
});

function StepConnector(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
    },
    alternativeLabel,
    className: classNameProp,
    classes,
    orientation,
    ...other
  } = props;
  const className = classNames(classes.root, classes[orientation], alternativeLabel && classes.alternativeLabel, classNameProp);
  const lineClassName = classNames(classes.line, orientation === 'horizontal' && classes.lineHorizontal, orientation === 'vertical' && classes.lineVertical);
  return <div className={classNamesStr(className)} {...other}>
      <span className={classNamesStr(lineClassName)} />
    </div>;
}

const defaultProps = StepConnector.defaultProps = {
  alternativeLabel: false,
  orientation: 'horizontal'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/StepConnector/StepConnector').Shape>}
*/
export const StepConnectorCreator = withStyles(styles, StepConnector, {
  isMui: true,
  defaultProps
});
const StepConnectorComponent = StepConnectorCreator();
if (StepConnector.muiName) StepConnectorComponent.muiName = StepConnector.muiName;
export default StepConnectorComponent;