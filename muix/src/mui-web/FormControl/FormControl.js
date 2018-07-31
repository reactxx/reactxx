import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { isFilled, isAdornedStart } from '../Input/Input';
import { capitalize } from '../utils/helpers';
import { isMuiElement } from '../utils/reactHelpers';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    flexDirection: 'column',
    position: 'relative',
    // Reset fieldset default style
    minWidth: 0,
    padding: 0,
    margin: 0,
    border: 0
  },

  /* Styles applied to the root element if `margin="normal"`. */
  marginNormal: {
    marginTop: 16,
    marginBottom: 8
  },

  /* Styles applied to the root element if `margin="dense"`. */
  marginDense: {
    marginTop: 8,
    marginBottom: 4
  },

  /* Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: {
    width: '100%'
  }
};
/**
 * Provides context such as filled/focused/error/required for form inputs.
 * Relying on the context provides high flexibilty and ensures that the state always stays
 * consistent across the children of the `FormControl`.
 * This context is used by the following components:
 *  - FormLabel
 *  - FormHelperText
 *  - Input
 *  - InputLabel
 */

class FormControl extends React.Component {
  constructor(props) {
    super(props); // We need to iterate through the children and find the Input in order
    // to fully support server side rendering.

    const {
      children
    } = this.props;

    if (children) {
      React.Children.forEach(children, child => {
        if (!isMuiElement(child, ['Input', 'Select', 'NativeSelect'])) {
          return;
        }

        if (isFilled(child.props, true)) {
          this.state.filled = true;
        }

        const input = isMuiElement(child, ['Select', 'NativeSelect']) ? child.props.input : child;

        if (input && isAdornedStart(input.props)) {
          this.state.adornedStart = true;
        }
      });
    }
  }

  state = {
    adornedStart: false,
    filled: false,
    focused: false
  };

  getChildContext() {
    const {
      disabled,
      error,
      required,
      margin
    } = this.props;
    const {
      adornedStart,
      filled,
      focused
    } = this.state;
    return {
      muiFormControl: {
        adornedStart,
        disabled,
        error,
        filled,
        focused,
        margin,
        onBlur: this.handleBlur,
        onEmpty: this.handleClean,
        onFilled: this.handleDirty,
        onFocus: this.handleFocus,
        required
      }
    };
  }

  handleFocus = () => {
    this.setState(state => !state.focused ? {
      focused: true
    } : null);
  };
  handleBlur = () => {
    this.setState(state => state.focused ? {
      focused: false
    } : null);
  };
  handleDirty = () => {
    if (!this.state.filled) {
      this.setState({
        filled: true
      });
    }
  };
  handleClean = () => {
    if (this.state.filled) {
      this.setState({
        filled: false
      });
    }
  };

  render() {
    const {
      $system: {
        classNames,
        classNamesStr,
        theme
      },
      classes,
      className,
      component: Component,
      disabled,
      error,
      fullWidth,
      margin,
      required,
      ...other
    } = this.props;
    return <Component className={classNamesStr(classes.root, margin !== 'none' && classes[`margin${capitalize(margin)}`], fullWidth && classes.fullWidth, className)} {...other} />;
  }

}

FormControl.childContextTypes = {
  muiFormControl: PropTypes.object
};
const defaultProps = FormControl.defaultProps = {
  component: 'div',
  disabled: false,
  error: false,
  fullWidth: false,
  margin: 'none',
  required: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/FormControl/FormControl').Shape>}
*/
export const FormControlCreator = withStyles(styles, FormControl, {
  isMui: true,
  defaultProps
});
const FormControlComponent = FormControlCreator();
FormControlComponent.muiName = FormControl.muiName;
export default FormControlComponent;