import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Button from 'reactxx-muix/current/Button/Button';
import Dialog from 'reactxx-muix/current/Dialog/Dialog';
import ListItemText from 'reactxx-muix/current/ListItemText/ListItemText';
import ListItem from 'reactxx-muix/current/ListItem/ListItem';
import List from 'reactxx-muix/current/List/List';
import Divider from 'reactxx-muix/current/Divider/Divider';
import AppBar from 'reactxx-muix/current/AppBar/AppBar';
import Toolbar from 'reactxx-muix/current/Toolbar/Toolbar';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import Typography from 'reactxx-muix/current/Typography/Typography';
import CloseIcon from 'reactxx-icons/Close';
import Slide from 'reactxx-muix/current/Slide/Slide';
const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component<any, any> {
  state: any = {
    open: false
  };
  handleClickOpen = () => {
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
    return <div>
        <Button onClick={this.handleClickOpen}>Open full-screen dialog</Button>
        <Dialog fullScreen open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
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
      </div>;
  }

}

FullScreenDialog['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), FullScreenDialog)();