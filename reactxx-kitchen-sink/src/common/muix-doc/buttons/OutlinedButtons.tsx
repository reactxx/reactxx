import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Button from 'reactxx-muix/current/Button/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

function OutlinedButtons(props) {
  const {
    classes
  } = props;
  return <div>
      <Button variant="outlined" className={classes.button}>
        Default
      </Button>
      <Button variant="outlined" color="primary" className={classes.button}>
        Primary
      </Button>
      <Button variant="outlined" color="secondary" className={classes.button}>
        Secondary
      </Button>
      <Button variant="outlined" disabled className={classes.button}>
        Disabled
      </Button>
      <Button variant="outlined" href="#outlined-buttons" className={classes.button}>
        Link
      </Button>
      <input accept="image/*" className={classNamesStr(classes.input)} id="outlined-button-file" multiple type="file" />
      <label htmlFor="outlined-button-file">
        <Button variant="outlined" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
    </div>;
}

OutlinedButtons['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), OutlinedButtons)();