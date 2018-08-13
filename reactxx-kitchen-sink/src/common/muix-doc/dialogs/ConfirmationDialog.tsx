/* eslint-disable react/no-multi-comp */
import { classNamesStr, classNames } from 'reactxx-basic';
import React from 'react';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Button from 'reactxx-muix/current/Button/Button';
import List from 'reactxx-muix/current/List/List';
import ListItem from 'reactxx-muix/current/ListItem/ListItem';
import ListItemText from 'reactxx-muix/current/ListItemText/ListItemText';
import DialogTitle from 'reactxx-muix/current/DialogTitle/DialogTitle';
import DialogContent from 'reactxx-muix/current/DialogContent/DialogContent';
import DialogActions from 'reactxx-muix/current/DialogActions/DialogActions';
import Dialog from 'reactxx-muix/current/Dialog/Dialog';
import RadioGroup from 'reactxx-muix/current/RadioGroup/RadioGroup';
import Radio from 'reactxx-muix/current/Radio/Radio';
import FormControlLabel from 'reactxx-muix/current/FormControlLabel/FormControlLabel';
const options = ['None', 'Atria', 'Callisto', 'Dione', 'Ganymede', 'Hangouts Call', 'Luna', 'Oberon', 'Phobos', 'Pyxis', 'Sedna', 'Titania', 'Triton', 'Umbriel'];

class ConfirmationDialogRaw extends React.Component<any, any> {
  radioGroupRef = null;

  constructor(props) {
    super(props);
    this.state.value = this.props.value;
  }

  state: any = {}; // TODO

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleEntering = () => {
    this.radioGroupRef.focus();
  };
  handleCancel = () => {
    this.props.onClose(this.props.value);
  };
  handleOk = () => {
    this.props.onClose(this.state.value);
  };
  handleChange = (event, value) => {
    this.setState({
      value
    });
  };

  render() {
    const {
      value,
      ...other
    } = this.props;
    return <Dialog disableBackdropClick disableEscapeKeyDown maxWidth="xs" onEntering={this.handleEntering} aria-labelledby="confirmation-dialog-title" {...other}>
        <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
        <DialogContent>
          <RadioGroup ref={ref => {
          this.radioGroupRef = ref;
        }} aria-label="Ringtone" name="ringtone" value={this.state.value} onChange={this.handleChange}>
            {options.map(option => <FormControlLabel value={option} key={option} control={<Radio />} label={option} />)}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>;
  }

}

ConfirmationDialogRaw['propTypes'] = {
  onClose: PropTypes.func,
  value: PropTypes.string
};

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    width: '80%',
    maxHeight: 435
  }
});

class ConfirmationDialog extends React.Component<any, any> {
  button = null;
  state: any = {
    open: false,
    value: 'Dione'
  };
  handleClickListItem = () => {
    this.setState({
      open: true
    });
  };
  handleClose = value => {
    this.setState({
      value,
      open: false
    });
  };

  render() {
    const {
      classes
    } = this.props;
    return <div className={classNamesStr(classes.root)}>
        <List>
          <ListItem button divider disabled>
            <ListItemText primary="Interruptions" />
          </ListItem>
          <ListItem button divider aria-haspopup="true" aria-controls="ringtone-menu" aria-label="Phone ringtone" onClick={this.handleClickListItem}>
            <ListItemText primary="Phone ringtone" secondary={this.state.value} />
          </ListItem>
          <ListItem button divider disabled>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
          <ConfirmationDialogRaw classes={{
          paper: classes.paper
        }} open={this.state.open} onClose={this.handleClose} value={this.state.value} />
        </List>
      </div>;
  }

}

ConfirmationDialog['propTypes'] = {
  classes: PropTypes.object.isRequired
};
export default withStylesCreator((styles as any), ConfirmationDialog)();