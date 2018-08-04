//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Transition from "react-transition-group/Transition";
/**
 * @ignore - internal component.
 */

class Ripple extends React.Component {
  state = {
    visible: false,
    leaving: false
  };
  handleEnter = () => {
    this.setState({
      visible: true
    });
  };
  handleExit = () => {
    this.setState({
      leaving: true
    });
  };

  render() {
    const {
      $system: { classNames, classNamesStr, classNamesAny, theme },
      classes,
      className: classNameProp,
      pulsate,
      rippleX,
      rippleY,
      rippleSize,
      ...other
    } = this.props;
    const { visible, leaving } = this.state;
    const rippleClassName = classNames(
      classes.ripple,
      visible && classes.rippleVisible,
      pulsate && classes.ripplePulsate,
      classNameProp
    );
    const rippleStyles = {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX
    };
    const childClassName = classNames(
      classes.child,
      leaving && classes.childLeaving,
      pulsate && classes.childPulsate
    );
    return (
      <Transition
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        {...other}
      >
        <span className={classNamesStr(rippleClassName)} style={rippleStyles}>
          <span className={classNamesStr(childClassName)} />
        </span>
      </Transition>
    );
  }
}

Ripple.defaultProps = {
  pulsate: false
};
export default Ripple;
