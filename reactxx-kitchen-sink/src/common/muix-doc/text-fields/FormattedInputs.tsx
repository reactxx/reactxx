/* eslint-disable react/prefer-stateless-function */
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import React from 'react';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Input from 'reactxx-muix/current/Input/Input';
import InputLabel from 'reactxx-muix/current/InputLabel/InputLabel';
import TextField from 'reactxx-muix/current/TextField/TextField';
import FormControl from 'reactxx-muix/current/FormControl/FormControl';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

function TextMaskCustom(props) {
  const {
    inputRef,
    ...other
  } = props;
  return <MaskedInput {...other} ref={inputRef} mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} placeholderChar={'\u2000'} showMask />;
}

TextMaskCustom['propTypes'] = {
  inputRef: PropTypes.func.isRequired
};

function NumberFormatCustom(props) {
  const {
    inputRef,
    onChange,
    ...other
  } = props;
  return <NumberFormat {...other} ref={inputRef} onValueChange={values => {
    onChange({
      target: {
        value: values.value
      }
    });
  }} thousandSeparator prefix="$" />;
}

NumberFormatCustom['propTypes'] = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

class FormattedInputs extends React.Component<any, any> {
  state: any = {
    textmask: '(1  )    -    ',
    numberformat: '1320'
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const {
      classes
    } = this.props;
    const {
      textmask,
      numberformat
    } = this.state;
    return <div className={classNamesStr(classes.container)}>
        <FormControl className={classNames(classes.formControl)}>
          <InputLabel htmlFor="formatted-text-mask-input">react-text-mask</InputLabel>
          <Input value={textmask} onChange={this.handleChange('textmask')} id="formatted-text-mask-input" inputComponent={TextMaskCustom} />
        </FormControl>
        <TextField className={classNames(classes.formControl)} label="react-number-format" value={numberformat} onChange={this.handleChange('numberformat')} id="formatted-numberformat-input" InputProps={{
        inputComponent: NumberFormatCustom
      }} />
      </div>;
  }

}

FormattedInputs['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), FormattedInputs)();