//https://codesandbox.io/s/1rw8v2o6yq

//TODO: 
// - D:\reactxx\muix\src\mui-web\InputLabel\InputLabel.js, remove transform: 'translate(0, 21px) scale(1)'
// replace margin and padding by marginTop..., paddingTop...
// custom input not in example
import React from 'react'
import withStylesCreator, { toAtomic } from 'reactxx-mui-web/styles/withStyles'

import TextField from 'reactxx-muix/current/TextField/TextField';
import FormControl from 'reactxx-muix/current/FormControl/FormControl';
import Input from 'reactxx-muix/current/Input/Input';
import InputLabel from 'reactxx-muix/current/InputLabel/InputLabel';
import FormHelperText from 'reactxx-muix/current/FormHelperText/FormHelperText';
import InputAdornment from 'reactxx-muix/current/InputAdornment/InputAdornment';
import Grid from 'reactxx-muix/current/Grid/Grid';

import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';

import { Icon } from 'reactxx-primitives'
import { Eye } from 'reactxx-mdi/Eye'
import { EyeOff } from 'reactxx-mdi/EyeOff'
import { AccountCircle } from 'reactxx-mdi/AccountCircle'

import MenuItem from 'reactxx-muix/current/MenuItem/MenuItem';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...toAtomic('padding', '30px'),
    overflow: 'auto'
  } as React.CSSProperties,
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexShrink: 0,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  formControl: {
    ...toAtomic('margin', theme.spacing.unit),
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField2: {
    flexBasis: 200,
  },
  margin: {
    ...toAtomic('margin', theme.spacing.unit),
  },
  input: {
    ...toAtomic('margin', theme.spacing.unit),
  },
});

function inputWithIcon(props) {
  const { classes, $system: { classNames, classNamesStr } } = props;

  return (
    <div className={classNamesStr(classes.container)}>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Icon data={AccountCircle} />
            </InputAdornment>
          }
        />
      </FormControl>
      <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="TextField"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon data={AccountCircle} />
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <Icon data={AccountCircle}/>
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="With a grid" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
const InputWithIcon = withStylesCreator(styles as any, inputWithIcon)()

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

class formattedInputs extends React.Component<any> {
  state = {
    textmask: '(1  )    -    ',
    numberformat: '1320',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, $system: { classNamesStr } } = this.props;
    const { textmask, numberformat } = this.state;

    return (
      <div className={classNamesStr(classes.container)}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="formatted-text-mask-input">react-text-mask</InputLabel>
          <Input
            value={textmask}
            onChange={this.handleChange('textmask')}
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
          />
        </FormControl>
        <TextField
          className={classes.formControl}
          label="react-number-format"
          value={numberformat}
          onChange={this.handleChange('numberformat')}
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </div>
    );
  }
}
const FormattedInputs = withStylesCreator(styles as any, formattedInputs)()

function inputs(props) {
  const { classes, $system: { classNamesStr } } = props;
  return (
    <div className={classNamesStr(classes.container)}>
      <Input
        defaultValue="Hello world"
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
      <Input
        placeholder="Placeholder"
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
      <Input
        value="Disabled"
        className={classes.input}
        disabled
        inputProps={{
          'aria-label': 'Description',
        }}
      />
      <Input
        defaultValue="Error"
        className={classes.input}
        error
        inputProps={{
          'aria-label': 'Description',
        }}
      />
    </div>
  );
}
const Inputs = withStylesCreator(styles as any, inputs)()

const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

class inputAdornments extends React.Component<any, any> {
  state = {
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes, $system: { classNamesStr, classNames } } = this.props;

    return (
      <div className={classNamesStr(classes.container)}>
        <TextField
          label="With normal TextField"
          id="simple-start-adornment"
          className={classNames(classes.margin, classes.textField2)}
          InputProps={{
            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
          }}
        />
        <TextField
          select
          label="With Select"
          className={classNames(classes.margin, classes.textField2)}
          value={this.state.weightRange}
          onChange={this.handleChange('weightRange')}
          InputProps={{
            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
          }}
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
          <Input
            id="adornment-amount"
            value={this.state.amount}
            onChange={this.handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        <FormControl
          className={classNames(classes.margin, classes.withoutLabel, classes.textField2)}
          aria-describedby="weight-helper-text"
        >
          <Input
            id="adornment-weight"
            value={this.state.weight}
            onChange={this.handleChange('weight')}
            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            inputProps={{
              'aria-label': 'Weight',
            }}
          />
          <FormHelperText id="weight-helper-text">Weight</FormHelperText>
        </FormControl>
        <FormControl className={classNames(classes.margin, classes.textField2)}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <Icon
                  data={this.state.showPassword ? EyeOff : Eye}
                  $web={{ onClick: this.handleClickShowPassword, onMouseDown: this.handleMouseDownPassword }}
                />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    );
  }
}
const InputAdornments = withStylesCreator(styles as any, inputAdornments)()

const textFieldMargins = props => {
  const { classes, $system: { classNamesStr } } = props;

  return (
    <div className={classNamesStr(classes.container)}>
      <TextField
        label="None"
        id="margin-none"
        defaultValue="Default Value"
        className={classes.textField}
        helperText="Some important text"
      />
      <TextField
        label="Dense"
        id="margin-dense"
        defaultValue="Default Value"
        className={classes.textField}
        helperText="Some important text"
        margin="dense"
      />
      <TextField
        label="Normal"
        id="margin-normal"
        defaultValue="Default Value"
        className={classes.textField}
        helperText="Some important text"
        margin="normal"
      />
    </div>
  );
};
const TextFieldMargins = withStylesCreator(styles as any, textFieldMargins)()

class composedTextField extends React.Component<any> {
  state = {
    name: 'Composed TextField',
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { classes, $system: { classNamesStr } } = this.props;

    return (
      <div className={classNamesStr(classes.container)}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-simple">Name</InputLabel>
          <Input id="name-simple" value={this.state.name} onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl} aria-describedby="name-helper-text">
          <InputLabel htmlFor="name-helper">Name</InputLabel>
          <Input id="name-helper" value={this.state.name} onChange={this.handleChange} />
          <FormHelperText id="name-helper-text">Some important helper text</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} disabled>
          <InputLabel htmlFor="name-disabled">Name</InputLabel>
          <Input id="name-disabled" value={this.state.name} onChange={this.handleChange} />
          <FormHelperText>Disabled</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl} error aria-describedby="name-error-text">
          <InputLabel htmlFor="name-error">Name</InputLabel>
          <Input id="name-error" value={this.state.name} onChange={this.handleChange} />
          <FormHelperText id="name-error-text">Error</FormHelperText>
        </FormControl>
      </div>
    );
  }
}
const ComposedTextField = withStylesCreator(styles as any, composedTextField)()

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

class textFields extends React.Component<any> {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: '',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render_() {
    const { classes, $system: { classNamesStr } } = this.props;

    return (
      <div className={classNamesStr(classes.container)}>
        <form noValidate autoComplete="off">
          <TextField
            id="select-currency"
            select
            label="Select"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your currency"
            margin="normal"
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </div>)
  }

  render() {
    const { classes, $system: { classNamesStr } } = this.props;

    return (
      <form className={classNamesStr(classes.container)} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="uncontrolled"
          label="Uncontrolled"
          defaultValue="foo"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="required"
          label="Required"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          error
          id="error"
          label="Error"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        <TextField
          id="read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('multiline')}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="helperText"
          label="Helper text"
          defaultValue="Default Value"
          className={classes.textField}
          helperText="Some important text"
          margin="normal"
        />
        <TextField
          id="with-placeholder"
          label="With placeholder"
          placeholder="Placeholder"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="textarea"
          label="With placeholder multiline"
          placeholder="Placeholder"
          multiline
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="number"
          label="Number"
          value={this.state.age}
          onChange={this.handleChange('age')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          id="search"
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="select-currency"
          select
          label="Select"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="select-currency-native"
          select
          label="Native select"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your currency"
          margin="normal"
        >
          {currencies.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="full-width"
          label="Label"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
        />
      </form>
    );
  }
}

const TextFields = withStylesCreator(styles as any, textFields)()

class App extends React.Component<any> {
  render_() {
    const { classes, $system: { classNamesStr, classNames } } = this.props;
    return <TextField
      label="With normal TextField"
      id="simple-start-adornment"
      className={classNames(classes.margin, classes.textField2)}
      InputProps={{
        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
      }}
    />
  }
  render() {
    const { classes, $system: { classNamesStr } } = this.props;
    return <div className={classNamesStr(classes.root)}>
      {/*
    */}
      <h2>TextField</h2>
      <TextFields />
      <h2>Components</h2>
      <ComposedTextField />
      <h2>Layout</h2>
      <TextFieldMargins />
      <h2>Input Adornments</h2>
      <InputAdornments />
      <h2>Inputs</h2>
      <Inputs />
      <h2>Formatted inputs</h2>
      <FormattedInputs />
      <h2>With icon</h2>
      <InputWithIcon />
    </div>
  }
}

export default withStylesCreator(styles as any, App)()