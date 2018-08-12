import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Button from 'reactxx-muix/current/Button/Button';
import AddIcon from 'reactxx-icons/Add';
import Icon from 'reactxx-muix/current/Icon/Icon';
import DeleteIcon from 'reactxx-icons/Delete';
import NavigationIcon from 'reactxx-icons/Navigation';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function FloatingActionButtons(props) {
  const {
    classes
  } = props;
  return <div>
      <Button variant="fab" color="primary" aria-label="Add" className={classNames(classes.button)}>
        <AddIcon />
      </Button>
      <Button variant="fab" color="secondary" aria-label="Edit" className={classNames(classes.button)}>
        <Icon>edit_icon</Icon>
      </Button>
      <Button variant="extendedFab" aria-label="Delete" className={classNames(classes.button)}>
        <NavigationIcon className={classNames(classes.extendedIcon)} />
        Extended
      </Button>
      <Button variant="fab" disabled aria-label="Delete" className={classNames(classes.button)}>
        <DeleteIcon />
      </Button>
    </div>;
}

FloatingActionButtons['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), FloatingActionButtons)();