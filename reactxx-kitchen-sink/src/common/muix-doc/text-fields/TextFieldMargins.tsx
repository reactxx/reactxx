import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import TextField from 'reactxx-muix/current/TextField/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

const TextFieldMargins = props => {
  const {
    classes
  } = props;
  return <div className={classNamesStr(classes.container)}>
      <TextField label="None" id="margin-none" defaultValue="Default Value" className={classNames(classes.textField)} helperText="Some important text" />
      <TextField label="Dense" id="margin-dense" defaultValue="Default Value" className={classNames(classes.textField)} helperText="Some important text" margin="dense" />
      <TextField label="Normal" id="margin-normal" defaultValue="Default Value" className={classNames(classes.textField)} helperText="Some important text" margin="normal" />
    </div>;
};

TextFieldMargins['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), TextFieldMargins)();