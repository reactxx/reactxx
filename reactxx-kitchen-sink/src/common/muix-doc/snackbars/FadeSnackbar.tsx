import React from 'react';
import { classNamesStr, classNames } from 'reactxx-basic';
import Button from 'reactxx-muix/current/Button/Button';
import Snackbar from 'reactxx-muix/current/Snackbar/Snackbar';
import Fade from 'reactxx-muix/current/Fade/Fade';

class FadeSnackbar extends React.Component<any, any> {
  state: any = {
    open: false
  };
  handleClick = () => {
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
        <Button onClick={this.handleClick}>Open with Fade Transition</Button>
        <Snackbar open={this.state.open} onClose={this.handleClose} TransitionComponent={Fade} ContentProps={{
        'aria-describedby': 'message-id'
      }} message={<span id="message-id">I love snacks</span>} />
      </div>;
  }

}

export default FadeSnackbar;