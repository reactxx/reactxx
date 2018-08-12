import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import Button from 'reactxx-muix/current/Button/Button';
import Dialog from 'reactxx-muix/current/Dialog/Dialog';
import DialogActions from 'reactxx-muix/current/DialogActions/DialogActions';
import DialogContent from 'reactxx-muix/current/DialogContent/DialogContent';
import DialogContentText from 'reactxx-muix/current/DialogContentText/DialogContentText';
import DialogTitle from 'reactxx-muix/current/DialogTitle/DialogTitle';
import Slide from 'reactxx-muix/current/Slide/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component<any, any> {
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
    return <div>
        <Button onClick={this.handleClickOpen}>Slide in alert dialog</Button>
        <Dialog open={this.state.open} TransitionComponent={Transition} keepMounted onClose={this.handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
          <DialogTitle id="alert-dialog-slide-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>;
  }

}

export default AlertDialogSlide;