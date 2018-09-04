//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v3.0.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import withStylesCreator from 'reactxx-mui-web/styles/withStyles';
import Typography from 'reactxx-mui-web/Typography/Typography';
import Modal from 'reactxx-mui-web/Modal/Modal';
import Button from 'reactxx-mui-web/Button/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class SimpleModal extends React.Component<any, any> {
  state: any = {
    open: false
  };
  handleOpen = () => {
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
    const {
      classes
    } = this.props;
    return <div>
        <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.open} onClose={this.handleClose}>
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <SimpleModalWrapped />
          </div>
        </Modal>
      </div>;
  }

}

SimpleModal['propTypes'] = {
  classes: PropTypes.object.isRequired
}; // We need an intermediary variable for handling the recursive nesting.

const SimpleModalWrapped = withStylesCreator((styles as any), SimpleModal)();
export default SimpleModalWrapped;