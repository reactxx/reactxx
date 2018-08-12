import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import AddIcon from 'reactxx-icons/Add';
import Button from 'reactxx-muix/current/Button/Button';
import DeleteIcon from 'reactxx-icons/Delete';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import Tooltip from 'reactxx-muix/current/Tooltip/Tooltip';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  }
});

function SimpleTooltips(props) {
  const {
    classes
  } = props;
  return <div>
      <Tooltip title="Delete">
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add">
        <Button variant="fab" color="primary" aria-label="Add" className={classNames(classes.fab)}>
          <AddIcon />
        </Button>
      </Tooltip>
      <Tooltip title="FAB 'position: absolute;'">
        <Button variant="fab" color="secondary" className={classNames(classes.absolute)}>
          <AddIcon />
        </Button>
      </Tooltip>
    </div>;
}

SimpleTooltips['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), SimpleTooltips)();