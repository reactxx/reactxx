import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'reactxx-basic';
import createMuiTheme from 'reactxx-mui-web/styles/createMuiTheme';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Input from 'reactxx-muix/current/Input/Input';
import InputLabel from 'reactxx-muix/current/InputLabel/InputLabel';
import TextField from 'reactxx-muix/current/TextField/TextField';
import FormControl from 'reactxx-muix/current/FormControl/FormControl';
import purple from 'reactxx-mui-web/colors/purple';
import green from 'reactxx-mui-web/colors/green';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500]
    }
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500]
    }
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

function CustomizedInputs(props) {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.container)}>
      <FormControl className={classes.margin}>
        <InputLabel FormLabelClasses={{
        root: classes.cssLabel,
        focused: classes.cssFocused
      }} htmlFor="custom-css-input">
          Custom CSS
        </InputLabel>
        <Input classes={{
        underline: classes.cssUnderline
      }} id="custom-css-input" />
      </FormControl>
      <ThemeProvider theme={(theme as any)}>
        <TextField className={classes.margin} label="ThemeProvider" id="mui-theme-provider-input" />
      </ThemeProvider>
      <TextField defaultValue="react-bootstrap" label="Bootstrap" id="bootstrap-input" InputProps={{
      disableUnderline: true,
      classes: {
        root: classes.bootstrapRoot,
        input: classes.bootstrapInput
      }
    }} InputLabelProps={{
      shrink: true,
      className: classes.bootstrapFormLabel
    }} />
    </div>;
}

CustomizedInputs['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), CustomizedInputs)();