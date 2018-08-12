import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'reactxx-basic';
import createMuiTheme from 'reactxx-mui-web/styles/createMuiTheme';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Button from 'reactxx-muix/current/Button/Button';
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
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700]
    }
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf'
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
    }
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
      <Button variant="contained" color="primary" className={classNames(classes.margin, classes.cssRoot)}>
        Custom CSS
      </Button>
      <ThemeProvider theme={(theme as any)}>
        <Button variant="contained" color="primary" className={classNames(classes.margin)}>
          ThemeProvider
        </Button>
      </ThemeProvider>
      <Button variant="contained" color="primary" disableRipple className={classNames(classes.margin, classes.bootstrapRoot)}>
        Bootstrap
      </Button>
    </div>;
}

CustomizedInputs['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), CustomizedInputs)();