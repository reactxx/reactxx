import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import Button from 'reactxx-muix/current/Button/Button';
import Dialog from 'reactxx-muix/current/Dialog/Dialog';
import DialogActions from 'reactxx-muix/current/DialogActions/DialogActions';
import DialogContent from 'reactxx-muix/current/DialogContent/DialogContent';
import DialogContentText from 'reactxx-muix/current/DialogContentText/DialogContentText';
import DialogTitle from 'reactxx-muix/current/DialogTitle/DialogTitle';

class AlertDialog extends React.Component<any, any> {
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
        <Button onClick={this.handleClickOpen}>Open alert dialog</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>;
  }

}

export default AlertDialog;