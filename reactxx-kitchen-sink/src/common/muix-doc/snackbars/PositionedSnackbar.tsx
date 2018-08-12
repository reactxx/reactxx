import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import Button from 'reactxx-muix/current/Button/Button';
import Snackbar from 'reactxx-muix/current/Snackbar/Snackbar';

class PositionedSnackbar extends React.Component<any, any> {
  state: any = {
    open: false,
    vertical: 'top',
    horizontal: 'center'
  };
  handleClick = state => () => {
    this.setState({
      open: true,
      ...state
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {
      vertical,
      horizontal,
      open
    } = this.state;
    return <div>
        <Button onClick={this.handleClick({
        vertical: 'top',
        horizontal: 'center'
      })}>
          Top-Center
        </Button>
        <Button onClick={this.handleClick({
        vertical: 'top',
        horizontal: 'right'
      })}>
          Top-Right
        </Button>
        <Button onClick={this.handleClick({
        vertical: 'bottom',
        horizontal: 'right'
      })}>
          Bottom-Right
        </Button>
        <Button onClick={this.handleClick({
        vertical: 'bottom',
        horizontal: 'center'
      })}>
          Bottom-Center
        </Button>
        <Button onClick={this.handleClick({
        vertical: 'bottom',
        horizontal: 'left'
      })}>
          Bottom-Left
        </Button>
        <Button onClick={this.handleClick({
        vertical: 'top',
        horizontal: 'left'
      })}>
          Top-Left
        </Button>
        <Snackbar anchorOrigin={{
        vertical,
        horizontal
      }} open={open} onClose={this.handleClose} ContentProps={{
        'aria-describedby': 'message-id'
      }} message={<span id="message-id">I love snacks</span>} />
      </div>;
  }

}

export default PositionedSnackbar;