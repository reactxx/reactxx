/* eslint-disable react/no-multi-comp */
import { mergeRulesets as classNamesStr } from 'reactxx-primitives';
import React from 'react';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Button from 'reactxx-muix/current/Button/Button';
import Avatar from 'reactxx-muix/current/Avatar/Avatar';
import List from 'reactxx-muix/current/List/List';
import ListItem from 'reactxx-muix/current/ListItem/ListItem';
import ListItemAvatar from 'reactxx-muix/current/ListItemAvatar/ListItemAvatar';
import ListItemText from 'reactxx-muix/current/ListItemText/ListItemText';
import DialogTitle from 'reactxx-muix/current/DialogTitle/DialogTitle';
import Dialog from 'reactxx-muix/current/Dialog/Dialog';
import PersonIcon from 'reactxx-icons/Person';
import AddIcon from 'reactxx-icons/Add';
import Typography from 'reactxx-muix/current/Typography/Typography';
import blue from 'reactxx-mui-web/colors/blue';
const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

class SimpleDialog extends React.Component<any, any> {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };
  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const {
      classes,
      onClose,
      selectedValue,
      ...other
    } = this.props;
    return <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <div>
          <List>
            {emails.map(email => <ListItem button onClick={() => this.handleListItemClick(email)} key={email}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItem>)}
            <ListItem button onClick={() => this.handleListItemClick('addAccount')}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
          </List>
        </div>
      </Dialog>;
  }

}

SimpleDialog['propTypes'] = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};
const SimpleDialogWrapped = withStylesCreator((styles as any), SimpleDialog)();

class SimpleDialogDemo extends React.Component<any, any> {
  state: any = {
    open: false,
    selectedValue: emails[1]
  };
  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = value => {
    this.setState({
      selectedValue: value,
      open: false
    });
  };

  render() {
    return <div>
        <Typography variant="subheading">Selected: {this.state.selectedValue}</Typography>
        <br />
        <Button onClick={this.handleClickOpen}>Open simple dialog</Button>
        <SimpleDialogWrapped selectedValue={this.state.selectedValue} open={this.state.open} onClose={this.handleClose} />
      </div>;
  }

}

export default SimpleDialogDemo;