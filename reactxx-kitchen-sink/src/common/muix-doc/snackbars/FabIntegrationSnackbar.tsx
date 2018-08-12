import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import AppBar from 'reactxx-muix/current/AppBar/AppBar';
import Toolbar from 'reactxx-muix/current/Toolbar/Toolbar';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import MenuIcon from 'reactxx-icons/Menu';
import Typography from 'reactxx-muix/current/Typography/Typography';
import Button from 'reactxx-muix/current/Button/Button';
import AddIcon from 'reactxx-icons/Add';
import Snackbar from 'reactxx-muix/current/Snackbar/Snackbar';

const styles = theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden'
  },
  appFrame: {
    width: 360,
    height: 360,
    backgroundColor: theme.palette.background.paper
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    marginBottom: theme.spacing.unit
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  fabMoveUp: {
    transform: 'translate3d(0, -46px, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut
    })
  },
  fabMoveDown: {
    transform: 'translate3d(0, 0, 0)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    })
  },
  snackbar: {
    position: 'absolute'
  },
  snackbarContent: {
    width: 360
  }
});

class FabIntegrationSnackbar extends React.Component<any, any> {
  state: any = {
    open: false
  };
  handleClick = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {
      classes
    } = this.props;
    const {
      open
    } = this.state;
    const fabClassName = classNames(classes.fab, open ? classes.fabMoveUp : classes.fabMoveDown);
    return <div className={classNamesStr(classes.root)}>
        <Button className={classes.button} onClick={this.handleClick}>
          Open snackbar
        </Button>
        <div className={classNamesStr(classes.appFrame)}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit">
                Out of my way!
              </Typography>
            </Toolbar>
          </AppBar>
          <Button variant="fab" color="secondary" className={fabClassName}>
            <AddIcon />
          </Button>
          <Snackbar open={open} autoHideDuration={4000} onClose={this.handleClose} ContentProps={{
          'aria-describedby': 'snackbar-fab-message-id',
          className: classes.snackbarContent
        }} message={<span id="snackbar-fab-message-id">Archived</span>} action={<Button color="inherit" size="small" onClick={this.handleClose}>
                Undo
              </Button>} className={classes.snackbar} />
        </div>
      </div>;
  }

}

FabIntegrationSnackbar['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), FabIntegrationSnackbar)();