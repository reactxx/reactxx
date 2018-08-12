import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
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
      <Button variant="outlined" className={classNames(classes.button)}>
        Default
      </Button>
      <Button variant="outlined" color="primary" className={classNames(classes.button)}>
        Primary
      </Button>
      <Button variant="outlined" color="secondary" className={classNames(classes.button)}>
        Secondary
      </Button>
      <Button variant="outlined" disabled className={classNames(classes.button)}>
        Disabled
      </Button>
      <Button variant="outlined" href="#outlined-buttons" className={classNames(classes.button)}>
        Link
      </Button>
      <input accept="image/*" className={classNamesStr(classes.input)} id="outlined-button-file" multiple type="file" />
      <label htmlFor="outlined-button-file">
        <Button variant="outlined" component="span" className={classNames(classes.button)}>
          Upload
        </Button>
      </label>
    </div>;
}

OutlinedButtons['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), OutlinedButtons)();