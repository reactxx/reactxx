import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Input from 'reactxx-muix/current/Input/Input';
import InputLabel from 'reactxx-muix/current/InputLabel/InputLabel';
import InputAdornment from 'reactxx-muix/current/InputAdornment/InputAdornment';
import FormControl from 'reactxx-muix/current/FormControl/FormControl';
import TextField from 'reactxx-muix/current/TextField/TextField';
import Grid from 'reactxx-muix/current/Grid/Grid';
import AccountCircle from 'reactxx-icons/AccountCircle';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

function InputWithIcon(props) {
  const {
    classes
  } = props;
  return <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
        <Input id="input-with-icon-adornment" startAdornment={<InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>} />
      </FormControl>
      <TextField className={classes.margin} id="input-with-icon-textfield" label="TextField" InputProps={{
      startAdornment: <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
    }} />
      <div className={classNamesStr(classes.margin)}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="With a grid" />
          </Grid>
        </Grid>
      </div>
    </div>;
}

InputWithIcon['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), InputWithIcon)();