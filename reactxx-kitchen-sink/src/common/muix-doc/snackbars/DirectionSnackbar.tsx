import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import Button from 'reactxx-muix/current/Button/Button';
import Snackbar from 'reactxx-muix/current/Snackbar/Snackbar';
import Slide from 'reactxx-muix/current/Slide/Slide';

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

class DirectionSnackbar extends React.Component<any, any> {
  state: any = {
    open: false,
    Transition: null
  };
  handleClick = Transition => () => {
    this.setState({
      open: true,
      Transition
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return <div>
        <Button onClick={this.handleClick(TransitionLeft)}>Right</Button>
        <Button onClick={this.handleClick(TransitionUp)}>Up</Button>
        <Button onClick={this.handleClick(TransitionRight)}>Left</Button>
        <Button onClick={this.handleClick(TransitionDown)}>Down</Button>
        <Snackbar open={this.state.open} onClose={this.handleClose} TransitionComponent={this.state.Transition} ContentProps={{
        'aria-describedby': 'message-id'
      }} message={<span id="message-id">I love snacks</span>} />
      </div>;
  }

}

export default DirectionSnackbar;