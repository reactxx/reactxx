import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import Button from 'reactxx-muix/current/Button/Button';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import SnackbarContent from 'reactxx-muix/current/SnackbarContent/SnackbarContent';
const action = <Button color="secondary" size="small">
    lorem ipsum dolorem
  </Button>;

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit
  }
});

function LongTextSnackbar(props) {
  const {
    classes
  } = props;
  return <div>
      <SnackbarContent className={classNames(classes.snackbar)} message="I love snacks." action={action} />
      <SnackbarContent className={classNames(classes.snackbar)} message={'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'} />
      <SnackbarContent className={classNames(classes.snackbar)} message="I love candy. I love cookies. I love cupcakes." action={action} />
      <SnackbarContent className={classNames(classes.snackbar)} message={'I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate.'} action={action} />
    </div>;
}

LongTextSnackbar['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), LongTextSnackbar)();