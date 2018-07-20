import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Textarea from './Textarea'; // Supports determination of isControlled().
// Controlled input accepts its current value as a prop.
//
// @see https://facebook.github.io/react/docs/forms.html#controlled-components
// @param value
// @returns {boolean} true if string (including '') or number (including zero)

export function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
} // Determine if field is empty or filled.
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.

export function isFilled(obj, SSR = false) {
  return obj && (hasValue(obj.value) && obj.value !== '' || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== '');
} // Determine if an Input is adorned on start.
// It's corresponding to the left with LTR.
//
// @param obj
// @returns {boolean} False when no adornments.
//                    True when adorned at the start.

export function isAdornedStart(obj) {
  return obj.startAdornment;
}
export const styles = theme => {
  const light = theme.palette.type === 'light';
  const placeholder = {
    color: 'currentColor',
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter
    })
  };
  const placeholderHidden = {
    opacity: 0
  };
  const placeholderVisible = {
    opacity: light ? 0.42 : 0.5
  };
  const bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  return {
    root: {
      // Mimics the default input display property used by browsers for an input.
      display: 'inline-flex',
      position: 'relative',
      fontFamily: theme.typography.fontFamily,
      color: light ? 'rgba(0, 0, 0, 0.87)' : theme.palette.common.white,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '1.1875em',
      // Reset (19px), match the native input line-height
      '&$disabled': {
        color: theme.palette.text.disabled
      }
    },
    formControl: {
      'label + &': {
        marginTop: 16
      }
    },
    focused: {},
    disabled: {},
    underline: {
      '&:after': {
        borderBottom: `2px solid ${theme.palette.primary[light ? 'dark' : 'light']}`,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        }),
        pointerEvents: 'none' // Transparent to the hover style.

      },
      '&$focused:after': {
        transform: 'scaleX(1)'
      },
      '&$error:after': {
        borderBottomColor: theme.palette.error.main,
        transform: 'scaleX(1)' // error is always underlined in red

      },
      '&:before': {
        borderBottom: `1px solid ${bottomLineColor}`,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '"\\00a0"',
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('border-bottom-color', {
          duration: theme.transitions.duration.shorter
        }),
        pointerEvents: 'none' // Transparent to the hover style.

      },
      '&:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: `2px solid ${theme.palette.text.primary}`
      },
      '&$disabled:before': {
        borderBottom: `1px dotted ${bottomLineColor}`
      }
    },
    error: {},
    multiline: {
      padding: `${8 - 2}px 0 ${8 - 1}px`
    },
    fullWidth: {
      width: '100%'
    },
    input: {
      font: 'inherit',
      color: 'currentColor',
      padding: `${8 - 2}px 0 ${8 - 1}px`,
      border: 0,
      boxSizing: 'content-box',
      verticalAlign: 'middle',
      background: 'none',
      margin: 0,
      // Reset for Safari
      // Remove grey highlight
      WebkitTapHighlightColor: 'transparent',
      display: 'block',
      // Make the flex item shrink with Firefox
      minWidth: 0,
      flexGrow: 1,
      '&::-webkit-input-placeholder': placeholder,
      '&::-moz-placeholder': placeholder,
      // Firefox 19+
      '&:-ms-input-placeholder': placeholder,
      // IE 11
      '&::-ms-input-placeholder': placeholder,
      // Edge
      '&:focus': {
        outline: 0
      },
      // Reset Firefox invalid required input style
      '&:invalid': {
        boxShadow: 'none'
      },
      '&::-webkit-search-decoration': {
        // Remove the padding when type=search.
        '-webkit-appearance': 'none'
      },
      // Show and hide the placeholder logic
      'label[data-shrink=false] + $formControl &': {
        '&::-webkit-input-placeholder': placeholderHidden,
        '&::-moz-placeholder': placeholderHidden,
        // Firefox 19+
        '&:-ms-input-placeholder': placeholderHidden,
        // IE 11
        '&::-ms-input-placeholder': placeholderHidden,
        // Edge
        '&:focus::-webkit-input-placeholder': placeholderVisible,
        '&:focus::-moz-placeholder': placeholderVisible,
        // Firefox 19+
        '&:focus:-ms-input-placeholder': placeholderVisible,
        // IE 11
        '&:focus::-ms-input-placeholder': placeholderVisible // Edge

      },
      '&$disabled': {
        opacity: 1 // Reset iOS opacity

      }
    },
    inputMarginDense: {
      paddingTop: 4 - 1
    },
    inputMultiline: {
      resize: 'none',
      padding: 0
    },
    inputType: {
      // type="date" or type="time", etc. have specific styles we need to reset.
      height: '1.1875em' // Reset (19px), match the native input line-height

    },
    inputTypeSearch: {
      // Improve type search style.
      '-moz-appearance': 'textfield',
      '-webkit-appearance': 'textfield'
    }
  };
};

function formControlState(props, context) {
  let disabled = props.disabled;
  let error = props.error;
  let margin = props.margin;

  if (context && context.muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = context.muiFormControl.disabled;
    }

    if (typeof error === 'undefined') {
      error = context.muiFormControl.error;
    }

    if (typeof margin === 'undefined') {
      margin = context.muiFormControl.margin;
    }
  }

  return {
    disabled,
    error,
    margin
  };
}

class Input extends React.Component {
  isControlled = this.props.value != null;
  input = null; // Holds the input reference

  constructor(props, context) {
    super(props, context);

    if (this.isControlled) {
      this.checkDirty(props);
    }

    const componentWillReceiveProps = (nextProps, nextContext) => {
      // The blur won't fire when the disabled state is set on a focused input.
      // We need to book keep the focused state manually.
      if (!formControlState(this.props, this.context).disabled && formControlState(nextProps, nextContext).disabled) {
        this.setState({
          focused: false
        });
      }
    };

    const componentWillUpdate = (nextProps, nextState, nextContext) => {
      // Book keep the focused state.
      if (!formControlState(this.props, this.context).disabled && formControlState(nextProps, nextContext).disabled) {
        const {
          muiFormControl
        } = this.context;

        if (muiFormControl && muiFormControl.onBlur) {
          muiFormControl.onBlur();
        }
      }
    }; // Support for react >= 16.3.0 && < 17.0.0

    /* istanbul ignore else */


    if (React.createContext) {
      this.UNSAFE_componentWillReceiveProps = componentWillReceiveProps;
      this.UNSAFE_componentWillUpdate = componentWillUpdate;
    } else {
      this.componentWillReceiveProps = componentWillReceiveProps;
      this.componentWillUpdate = componentWillUpdate;
    }
  }

  state = {
    focused: false
  };

  getChildContext() {
    // We are consuming the parent muiFormControl context.
    // We don't want a child to consume it a second time.
    return {
      muiFormControl: null
    };
  }

  componentDidMount() {
    if (!this.isControlled) {
      this.checkDirty(this.input);
    }
  }

  componentDidUpdate() {
    if (this.isControlled) {
      this.checkDirty(this.props);
    } // else performed in the onChange

  }

  handleFocus = event => {
    // Fix a bug with IE11 where the focus/blur events are triggered
    // while the input is disabled.
    if (formControlState(this.props, this.context).disabled) {
      event.stopPropagation();
      return;
    }

    this.setState({
      focused: true
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    const {
      muiFormControl
    } = this.context;

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };
  handleBlur = event => {
    this.setState({
      focused: false
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    const {
      muiFormControl
    } = this.context;

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };
  handleChange = event => {
    if (!this.isControlled) {
      this.checkDirty(this.input);
    } // Perform in the willUpdate


    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };
  handleRefInput = node => {
    this.input = node;
    let ref;

    if (this.props.inputRef) {
      ref = this.props.inputRef;
    } else if (this.props.inputProps && this.props.inputProps.ref) {
      ref = this.props.inputProps.ref;
    }

    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  checkDirty(obj) {
    const {
      muiFormControl
    } = this.context;

    if (isFilled(obj)) {
      if (muiFormControl && muiFormControl.onFilled) {
        muiFormControl.onFilled();
      }

      if (this.props.onFilled) {
        this.props.onFilled();
      }

      return;
    }

    if (muiFormControl && muiFormControl.onEmpty) {
      muiFormControl.onEmpty();
    }

    if (this.props.onEmpty) {
      this.props.onEmpty();
    }
  }

  render() {
    const {
      $system: {
        classNames,
        classNamesStr
      },
      autoComplete,
      autoFocus,
      classes,
      className: classNameProp,
      defaultValue,
      disabled: disabledProp,
      disableUnderline,
      endAdornment,
      error: errorProp,
      fullWidth,
      id,
      inputComponent,
      inputProps: {
        className: inputPropsClassName,
        ...inputPropsProp
      } = {},
      inputRef,
      margin: marginProp,
      multiline,
      name,
      onBlur,
      onChange,
      onEmpty,
      onFilled,
      onFocus,
      onKeyDown,
      onKeyUp,
      placeholder,
      readOnly,
      rows,
      rowsMax,
      startAdornment,
      type,
      value,
      ...other
    } = this.props;
    const {
      muiFormControl
    } = this.context;
    const {
      disabled,
      error,
      margin
    } = formControlState(this.props, this.context);
    const className = classNames(classes.root, disabled && classes.disabled, error && classes.error, fullWidth && classes.fullWidth, this.state.focused && classes.focused, muiFormControl && classes.formControl, multiline && classes.multiline, !disableUnderline && classes.underline, classNameProp);
    const inputClassName = classNames(classes.input, disabled && classes.disabled, type !== 'text' && classes.inputType, type === 'search' && classes.inputTypeSearch, multiline && classes.inputMultiline, margin === 'dense' && classes.inputMarginDense, inputPropsClassName);
    const required = muiFormControl && muiFormControl.required === true;
    let InputComponent = 'input';
    let inputProps = { ...inputPropsProp,
      ref: this.handleRefInput
    };

    if (inputComponent) {
      InputComponent = inputComponent;
      inputProps = {
        // Rename ref to inputRef as we don't know the
        // provided `inputComponent` structure.
        inputRef: this.handleRefInput,
        ...inputProps,
        ref: null
      };
    } else if (multiline) {
      if (rows && !rowsMax) {
        InputComponent = 'textarea';
      } else {
        inputProps = {
          rowsMax,
          textareaRef: this.handleRefInput,
          ...inputProps,
          ref: null
        };
        InputComponent = Textarea;
      }
    }

    return <div className={classNamesStr(className)} {...other}>
        {startAdornment}
        <InputComponent aria-invalid={error} autoComplete={autoComplete} autoFocus={autoFocus} className={inputClassName} defaultValue={defaultValue} disabled={disabled} id={id} name={name} onBlur={this.handleBlur} onChange={this.handleChange} onFocus={this.handleFocus} onKeyDown={onKeyDown} onKeyUp={onKeyUp} placeholder={placeholder} readOnly={readOnly} required={required ? true : undefined} rows={rows} type={type} value={value} {...inputProps} />
        {endAdornment}
      </div>;
  }

}

Input.muiName = 'Input';
Input.contextTypes = {
  muiFormControl: PropTypes.object
};
Input.childContextTypes = {
  muiFormControl: PropTypes.object
};
export default withStyles(styles, {
  name: 'MuiInput',
  defaultProps: {
    disableUnderline: false,
    fullWidth: false,
    multiline: false,
    type: 'text'
  }
})(Input);