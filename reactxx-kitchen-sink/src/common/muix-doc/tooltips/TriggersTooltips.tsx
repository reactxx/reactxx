import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import Grid from 'reactxx-muix/current/Grid/Grid';
import Button from 'reactxx-muix/current/Button/Button';
import Tooltip from 'reactxx-muix/current/Tooltip/Tooltip';
import ClickAwayListener from 'reactxx-muix/current/ClickAwayListener/ClickAwayListener';

class TriggersTooltips extends React.Component<any, any> {
  state: any = {
    open: false
  };
  handleTooltipClose = () => {
    this.setState({
      open: false
    });
  };
  handleTooltipOpen = () => {
    this.setState({
      open: true
    });
  };

  render() {
    return <div>
        <Grid container justify="center">
          <Grid item>
            <Tooltip disableFocusListener title="Add">
              <Button>Hover or touch</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip disableHoverListener title="Add">
              <Button>Focus or touch</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip disableFocusListener disableTouchListener title="Add">
              <Button>Hover</Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <ClickAwayListener onClickAway={this.handleTooltipClose}>
              <div>
                <Tooltip PopperProps={{
                disablePortal: true
              }} onClose={this.handleTooltipClose} open={this.state.open} disableFocusListener disableHoverListener disableTouchListener title="Add">
                  <Button onClick={this.handleTooltipOpen}>Click</Button>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </Grid>
        </Grid>
      </div>;
  }

}

export default TriggersTooltips;