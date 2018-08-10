import React from 'react';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles'
import Button from 'reactxx-muix/current/Button';
import Dialog from 'reactxx-muix/current/Dialog';
import ListItemText from 'reactxx-muix/current/ListItemText';
import ListItem from 'reactxx-muix/current/ListItem';
import List from 'reactxx-muix/current/List';
import Divider from 'reactxx-muix/current/Divider';
import AppBar from 'reactxx-muix/current/AppBar';
import Toolbar from 'reactxx-muix/current/Toolbar';
import IconButton from 'reactxx-muix/current/IconButton';
import Typography from 'reactxx-muix/current/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from 'reactxx-muix/current/Slide';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open full-screen dialog</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                Sound
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStylesCreator(styles, {})(FullScreenDialog);
