import React from 'react';
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import Button from 'reactxx-muix/current/Button/Button';
import TextField from 'reactxx-muix/current/TextField/TextField';
import Dialog from 'reactxx-muix/current/Dialog/Dialog';
import DialogActions from 'reactxx-muix/current/DialogActions/DialogActions';
import DialogContent from 'reactxx-muix/current/DialogContent/DialogContent';
import DialogContentText from 'reactxx-muix/current/DialogContentText/DialogContentText';
import DialogTitle from 'reactxx-muix/current/DialogTitle/DialogTitle';
export default class FormDialog extends React.Component<any, any> {
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
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>;
  }

}