import React from 'react';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import AddIcon from '@material-ui/icons/Add';
import Button from 'reactxx-muix/current/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from 'reactxx-muix/current/IconButton';
import Tooltip from 'reactxx-muix/current/Tooltip';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

function SimpleTooltips(props) {
  const { classes } = props;
  return (
    <div>
      <Tooltip title="Delete">
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Add">
        <Button variant="fab" color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Button>
      </Tooltip>
      <Tooltip title="FAB 'position: absolute;'">
        <Button variant="fab" color="secondary" className={classes.absolute}>
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

SimpleTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStylesCreator(styles, {})(SimpleTooltips);
