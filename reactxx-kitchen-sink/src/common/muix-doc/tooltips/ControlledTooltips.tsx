//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import React from 'react';
import Button from 'reactxx-muix/current/Button/Button';
import Tooltip from 'reactxx-muix/current/Tooltip/Tooltip';

class ControlledTooltips extends React.Component<any,any> {
  state: any = {
    open: false,
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Tooltip
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        title="Add"
      >
        <Button>Controlled</Button>
      </Tooltip>
    );
  }
}

export default ControlledTooltips;