import React from 'react';
import { mergeRulesetsStr as classNamesStr, mergeRulesets as classNames } from 'reactxx-primitives';
import Button from 'reactxx-muix/current/Button/Button';
import Menu from 'reactxx-muix/current/Menu/Menu';
import MenuItem from 'reactxx-muix/current/MenuItem/MenuItem';

class SimpleMenu extends React.Component<any, any> {
  state: any = {
    anchorEl: null
  };
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const {
      anchorEl
    } = this.state;
    return <div>
        <Button aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup="true" onClick={this.handleClick}>
          Open Menu
        </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>;
  }

}

export default SimpleMenu;