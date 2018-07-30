//https://codesandbox.io/s/1rw8v2o6yq
import React from 'react'
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'

import TextField from 'reactxx-mui-web/TextField/TextField';
import MenuItem from 'reactxx-mui-web/MenuItem/MenuItem';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px',
    flex: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

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

class TextFields extends React.Component<any> {
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
      <div className={classNamesStr(classes.root)}>
        <form className={classNamesStr(classes.container)} noValidate autoComplete="off">
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
      <div className={classNamesStr(classes.root)}>
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
      </div>
    );
  }
}

export default withStylesCreator(styles as any, TextFields)()