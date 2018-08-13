import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
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

function TextButtons(props) {
  const {
    classes
  } = props;
  return <div>
      <Button className={classNames(classes.button)}>Default</Button>
      <Button color="primary" className={classNames(classes.button)}>
        Primary
      </Button>
      <Button color="secondary" className={classNames(classes.button)}>
        Secondary
      </Button>
      <Button disabled className={classNames(classes.button)}>
        Disabled
      </Button>
      <Button href="#text-buttons" className={classNames(classes.button)}>
        Link
      </Button>
      <input accept="image/*" className={classNamesStr(classes.input)} id="flat-button-file" multiple type="file" />
      <label htmlFor="flat-button-file">
        <Button component="span" className={classNames(classes.button)}>
          Upload
        </Button>
      </label>
    </div>;
}

TextButtons['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), TextButtons)();