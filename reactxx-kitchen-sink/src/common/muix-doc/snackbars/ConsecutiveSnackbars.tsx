import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Button from 'reactxx-muix/current/Button/Button';
import Snackbar from 'reactxx-muix/current/Snackbar/Snackbar';
import IconButton from 'reactxx-muix/current/IconButton/IconButton';
import CloseIcon from 'reactxx-icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class ConsecutiveSnackbars extends React.Component<any, any> {
  queue = [];
  state: any = {
    open: false,
    messageInfo: {}
  };
  handleClick = message => () => {
    this.queue.push({
      message,
      key: new Date().getTime()
    });

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({
        open: false
      });
    } else {
      this.processQueue();
    }
  };
  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      });
    }
  };
  handleClose = (event, reason?) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      open: false
    });
  };
  handleExited = () => {
    this.processQueue();
  };

  render() {
    const {
      classes
    } = this.props;
    const {
      message,
      key
    } = this.state.messageInfo;
    return <div>
        <Button onClick={this.handleClick('message a')}>Show message A</Button>
        <Button onClick={this.handleClick('message b')}>Show message B</Button>
        <Snackbar key={key} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }} open={this.state.open} autoHideDuration={6000} onClose={this.handleClose} onExited={this.handleExited} ContentProps={{
        'aria-describedby': 'message-id'
      }} message={<span id="message-id">{message}</span>} action={[<Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>, <IconButton key="close" aria-label="Close" color="inherit" className={classNames(classes.close)} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>]} />
      </div>;
  }

}

ConsecutiveSnackbars['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ConsecutiveSnackbars)();